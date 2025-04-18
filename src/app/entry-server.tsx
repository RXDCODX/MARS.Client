import { StrictMode } from "react";
import {
  type RenderToPipeableStreamOptions,
  renderToPipeableStream,
} from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import PrivateRoutes from "../routes/Routes";

export function render(_url: string, options?: RenderToPipeableStreamOptions) {
  return renderToPipeableStream(
    <StrictMode>
      <StaticRouter location={_url}>
        <PrivateRoutes />
      </StaticRouter>
    </StrictMode>,
    options,
  );
}
