"use client";

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';

// swagger-ui-react touches `window` at module scope, so it can only ever
// render client-side — ssr: false keeps Next from trying to render it on
// the server and crashing the request.
const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function SwaggerUIClient({ url }: { url: string }) {
    return <SwaggerUI url={url} docExpansion="list" defaultModelsExpandDepth={2} persistAuthorization />;
}
