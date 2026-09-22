namespace Custom.BlazorPdf;

public record PdfError
{
    public required PdfErrorType ErrorType { get; init; }
    public required string? Message { get; set; }
}