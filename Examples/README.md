# Example host page

`DocumentViewer.razor` demonstrates the component in a route named `/document-viewer`. Copy the page and its colocated stylesheet into a Blazor application, ensure the `PdfViewer` namespace is available through `_Imports.razor`, and reference the Razor Class Library project.

The sample uses the public PDF.js demo document so the page works without adding a local PDF file. For production, replace `SamplePdfUrl` with a same-origin endpoint or a URL served with the required CORS headers.

```xml
<ProjectReference Include="../PdfViewer/PdfViewer.csproj" />
```

The example is intentionally host-framework neutral. It works as a routable page in Blazor Server, Blazor WebAssembly, or a .NET 8+ Blazor Web App.
