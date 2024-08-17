export async function downloadFile(fileUrl: string) {
    const response = await fetch(fileUrl);

    if (!response.ok) {
        throw new Error(`Failed to get file: ${response.statusText}`)
    }

    const file = await response.blob();
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = fileUrl.split('/').pop() || ""; // Extract filename from URL
    link.click();

    // Clean up the temporary link (optional)
    URL.revokeObjectURL(link.href);
    document.removeChild(link)
}