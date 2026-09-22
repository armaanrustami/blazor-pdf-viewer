# Custom.BlazorPdf

A standalone configurable Blazor PDF viewer for .NET 10. It is based on the familiar Blazor PDF viewer experience and adds mobile pinch-to-zoom plus independent feature switches.

## Install

```bash
dotnet add package Custom.BlazorPdf
```

In `Program.cs`:

```csharp
builder.Services.AddBlazorPdfViewer();
```

In `App.razor`:

```html
<link href="_content/Custom.BlazorPdf/blazorpdf.min.css" rel="stylesheet" />
```

In `_Imports.razor`:

```razor
@using Custom.BlazorPdf
```

## Basic usage

```razor
<PdfViewer Url="/documents/example.pdf" />
```

## Configurable usage

```razor
<PdfViewer
    Url="/documents/example.pdf"
    Height="80vh"
    ScrollMode="true"
    ShowToolbar="true"
    EnablePinchZoom="true"
    EnableSearch="true"
    EnablePagination="true"
    EnableZoom="true"
    EnableRotation="true"
    EnablePrint="false"
    EnableDownload="true"
    EnableDrawing="false"
    EnableMetadata="true"
    EnableThumbnails="false"
    EnableMenu="true" />
```

The feature switches default to `true`, preserving the normal viewer experience. `EnablePinchZoom` uses two-finger pointer gestures on mobile and snaps the result to the supported zoom levels from 25% through 500%.

## Feature parameters

| Parameter | Purpose |
|---|---|
| `ShowToolbar` | Show or hide the complete toolbar. |
| `EnablePinchZoom` | Enable or disable two-finger mobile pinch zoom. |
| `EnableSearch` | Enable search controls and search UI. |
| `EnablePagination` | Enable previous/next controls and page-number navigation. |
| `EnableZoom` | Enable zoom controls and reset-zoom menu action. |
| `EnableRotation` | Enable rotation and orientation actions. |
| `EnablePrint` | Enable print actions in toolbar/menu locations selected by `PrintButtonLocation`. |
| `EnableDownload` | Enable download actions in toolbar/menu locations selected by `DownloadButtonLocation`. |
| `EnableDrawing` | Enable drawing actions and drawing UI. |
| `EnableMetadata` | Enable metadata viewing. |
| `EnableThumbnails` | Enable the thumbnail panel and its toolbar toggle. |
| `EnableMenu` | Show or hide the dropdown menu. |
| `ScrollMode` | Render all pages in a scrollable document view instead of one page at a time. |
| `PermitPdfUploads` | Allow a PDF upload when no `Url` is supplied. |
| `EnableAnnotations` | Render annotations and forms in single-page mode. |

Existing options such as `PrintButtonLocation`, `DownloadButtonLocation`, `FindButtonLocation`, and `DrawButtonLocation` remain available and control placement when their corresponding feature switch is enabled.

## MudBlazor integration

For a MudBlazor-native toolbar and layout, install the companion package:

```bash
dotnet add package Custom.BlazorPdf.MudBlazor
```

The companion package targets .NET 10 and depends on MudBlazor 9.10.0. Register the core service as usual, import `Custom.BlazorPdf.MudBlazor`, and use `MudPdfViewer` with the same PDF source and viewer parameters. The underlying `EnablePinchZoom` option remains available because the MudBlazor viewer inherits the core viewer.

## Notes

Pinch zoom is implemented as a PDF re-render through the component's scale pipeline rather than a CSS-only transform, keeping the canvas and text/annotation layers aligned. The gesture host uses pointer events and is intended for mobile browsers and WebViews that expose pointer events.

This workspace contains the standalone source and a locally generated NuGet package. Replace the placeholder repository metadata and set your own author, license, signing, and NuGet publishing settings before publishing publicly.
