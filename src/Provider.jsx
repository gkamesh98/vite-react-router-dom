import React, { useMemo } from "react";
import PropTypes from 'prop-types'
import { createBrowserRouter, RouterProvider, createHashRouter, createMemoryRouter  } from "react-router-dom";

const pathGenerator = (path) => {
  return path
    .replace("/src/pages", "")
    .replace("layout.jsx", "")
    .replace("page.jsx", "")
    .replace("layout.tsx", "")
    .replace("page.tsx", "")
    .replaceAll("{", ":")
    .replaceAll("}", "");
};

const buildRouter = (modules, ErrorFallback = React.Fragment, NotFoundElement = <p>Not Found</p>) => {
  const { layoutArray, pagesArray } = Object.keys(modules).reduce(
    (previous, current) => {
      if (current.endsWith("layout.jsx") || current.endsWith("layout.tsx")) {
        previous.layoutArray.push(current);
      } else {
        previous.pagesArray.push(current);
      }

      return previous;
    },
    { layoutArray: [], pagesArray: [] }
  );

  const mainFinalRoutes = layoutArray.map((path) => ({
    path: pathGenerator(path),
    lazy: async () => {
      const p = await modules[path]();
      return { Component: p.default };
    },
    children: [],
    errorElement: <ErrorFallback />,
  }));

  const independentRoutes = [];

  pagesArray.forEach((path) => {
    const routePath = pathGenerator(path);

    const layoutIndex = mainFinalRoutes.findIndex(({ path }) =>
      routePath.startsWith(path)
    );

    const module = modules[path];

    const pageCommonPath = {
      path: routePath || "/",
      lazy: async () => {
        const p = await module();
        return { Component: p.default };
      },
      loader: async (...args) => {
        const p = await module();
        if (p.loader) {
          return p.loader(...args);
        }
        return null;
      },
      action: async (...args) => {
        const p = await module();
        if (p.action) return p.action(...args);
        return null;
      },
    };

    if (layoutIndex >= 0) {
      mainFinalRoutes[layoutIndex].children.push(pageCommonPath);
    } else {
      independentRoutes.push(pageCommonPath);
    }
  });

  const fallbackRoute = [
    {
      path: "*",
      element: NotFoundElement,
    },
  ];

  return [...mainFinalRoutes, ...independentRoutes, ...fallbackRoute];
};

const routerTypes = {
  browser: createBrowserRouter,
  hash: createHashRouter,
  memory: createMemoryRouter
}

const Routes = ({ defaultErrorElement, fallbackElement, notFoundElement, routerType, basename = '/'  }) => {
  const router = useMemo(() => {
    const browserRoutes = buildRouter(
      import.meta.glob("/src/pages/**/{page,layout}.{jsx,tsx}"),
      defaultErrorElement,
      notFoundElement
    );
    return routerTypes[routerType](browserRoutes, {
      basename
    });
  }, [basename]);

  return <RouterProvider router={router} fallbackElement={fallbackElement} />;
};

Routes.propTypes = {
  defaultErrorElement: PropTypes.elementType,
  notFoundElement: PropTypes.element,
  routerType: PropTypes.oneOf([
    ...Object.keys(routerTypes)
  ])
}

Routes.defaultProps = {
  routerType: 'browser'
}



export default Routes;
