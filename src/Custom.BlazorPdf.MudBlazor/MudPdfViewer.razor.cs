using Custom.BlazorPdf.MudBlazor.Config;
using Microsoft.AspNetCore.Components;

namespace Custom.BlazorPdf.MudBlazor;

public partial class MudPdfViewer : PdfViewer
{
    [Parameter] public MudPdfIconConfig Icons { get; set; } = new();
    [Parameter] public MudPdfColorConfig MudColors { get; set; } = new();
}