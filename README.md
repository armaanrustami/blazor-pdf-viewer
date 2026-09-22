# Blazor PDF Viewer and Custom.BlazorPdf

This public repository contains two related Blazor PDF viewer implementations:

- The original dependency-light viewer example in `PdfViewer/` and `Examples/`.
- The configurable .NET 10 Razor Class Library package in `src/Custom.BlazorPdf/`, with mobile pinch zoom and feature switches.
- The MudBlazor integration package in `src/Custom.BlazorPdf.MudBlazor/`.

## NuGet packages

```bash
dotnet add package Custom.BlazorPdf
# Optional MudBlazor-native toolbar and layout
dotnet add package Custom.BlazorPdf.MudBlazor
```

Both packages target **.NET 10** and are version **1.0.0**. The MudBlazor package uses MudBlazor 9.10.0.

## Custom.BlazorPdf features

The configurable viewer supports mobile two-finger pinch-to-zoom, search, pagination, toolbar visibility, zoom, rotation, printing, download, drawing, metadata, thumbnails, menus, annotations, uploads, scroll mode, colors, and localization. Pinch zoom is enabled by default and can be disabled with `EnablePinchZoom="false"`.

```razor
<PdfViewer Url="/documents/example.pdf"
           EnablePinchZoom="true"
           ShowToolbar="true"
           EnableSearch="true"
           EnablePagination="true"
           EnableZoom="true"
           EnableDownload="true"
           EnableThumbnails="false" />
```

See [`src/Custom.BlazorPdf/README.md`](src/Custom.BlazorPdf/README.md) for all parameters and MudBlazor integration details.

## Package artifacts

The generated `.nupkg` files are included in `packages/` for reproducibility. Normal consumers should install from NuGet.org.
