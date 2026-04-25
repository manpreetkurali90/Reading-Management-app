/**
 * Notes Manager Module
 * Handles note management for books including add, edit, delete, and export functionality
 */

const NotesManager = (() => {
  // Private properties
  const NOTES_PREFIX = "book_notes_";

  // Public API
  return {
    /**
     * Get notes for a specific book
     * @param {number} bookId - The book ID
     * @returns {string} The notes content
     */
    getNotes(bookId) {
      return localStorage.getItem(`${NOTES_PREFIX}${bookId}`) || "";
    },

    /**
     * Save or update notes for a book
     * @param {number} bookId - The book ID
     * @param {string} notesContent - The notes content
     */
    saveNotes(bookId, notesContent) {
      localStorage.setItem(`${NOTES_PREFIX}${bookId}`, notesContent);
    },

    /**
     * Delete notes for a book
     * @param {number} bookId - The book ID
     */
    deleteNotes(bookId) {
      localStorage.removeItem(`${NOTES_PREFIX}${bookId}`);
    },

    /**
     * Export notes as plain text file
     * @param {number} bookId - The book ID
     * @param {string} bookTitle - The book title
     * @param {string} bookAuthor - The book author (optional)
     */
    exportAsText(bookId, bookTitle, bookAuthor = "") {
      const notes = this.getNotes(bookId);
      if (!notes) {
        alert("No notes to export for this book.");
        return;
      }

      const content = this._generateTextContent(bookTitle, bookAuthor, notes);
      const filename = this._generateFilename(bookTitle, "txt");
      this._downloadFile(content, filename, "text/plain");
    },

    /**
     * Export notes as PDF file
     * @param {number} bookId - The book ID
     * @param {string} bookTitle - The book title
     * @param {string} bookAuthor - The book author (optional)
     */
    exportAsPDF(bookId, bookTitle, bookAuthor = "") {
      const notes = this.getNotes(bookId);
      if (!notes) {
        alert("No notes to export for this book.");
        return;
      }

      // Check if jsPDF library is available
      if (typeof jsPDF === "undefined") {
        alert("PDF export requires jsPDF library. Please add it to your HTML file.");
        console.log("Add this to your HTML: <script src='https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'></script>");
        return;
      }

      try {
        const jsPDF = window.jsPDF || window.jspdf?.jsPDF;
        if (!jsPDF) {
          throw new Error("jsPDF not found");
        }
        const doc = new jsPDF();

        // Set font
        doc.setFont("Arial");
        doc.setFontSize(16);

        // Add title
        doc.text(`Notes for: ${bookTitle}`, 20, 20);

        // Add author if provided
        if (bookAuthor) {
          doc.setFontSize(12);
          doc.setTextColor(100);
          doc.text(`by ${bookAuthor}`, 20, 30);
          doc.setTextColor(0);
        }

        // Add date
        doc.setFontSize(10);
        doc.setTextColor(150);
        doc.text(`Exported on: ${new Date().toLocaleDateString()}`, 20, bookAuthor ? 40 : 35);
        doc.setTextColor(0);

        // Add notes content with text wrapping
        doc.setFontSize(11);
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        const pageWidth = doc.internal.pageSize.getWidth();
        const maxWidth = pageWidth - 2 * margin;
        const splitText = doc.splitTextToSize(notes, maxWidth);

        let yPosition = bookAuthor ? 50 : 45;
        const lineHeight = 7;

        splitText.forEach((line) => {
          if (yPosition + lineHeight > pageHeight - margin) {
            doc.addPage();
            yPosition = margin;
          }
          doc.text(line, margin, yPosition);
          yPosition += lineHeight;
        });

        // Save PDF
        const filename = this._generateFilename(bookTitle, "pdf");
        doc.save(filename);
      } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Error generating PDF. Please try again.");
      }
    },

    /**
     * Export notes as both Text and PDF
     * @param {number} bookId - The book ID
     * @param {string} bookTitle - The book title
     * @param {string} bookAuthor - The book author (optional)
     */
    exportBoth(bookId, bookTitle, bookAuthor = "") {
      this.exportAsText(bookId, bookTitle, bookAuthor);
      setTimeout(() => {
        this.exportAsPDF(bookId, bookTitle, bookAuthor);
      }, 500);
    },

    /**
     * Private helper: Generate text content
     */
    _generateTextContent(bookTitle, bookAuthor, notes) {
      let content = `NOTES FOR: ${bookTitle}\n`;
      content += "=".repeat(50) + "\n\n";

      if (bookAuthor) {
        content += `Author: ${bookAuthor}\n`;
        content += "=".repeat(50) + "\n\n";
      }

      content += `Exported on: ${new Date().toLocaleString()}\n\n`;
      content += "---\n\n";
      content += notes;

      return content;
    },

    /**
     * Private helper: Generate filename
     */
    _generateFilename(bookTitle, extension) {
      const sanitized = bookTitle
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");

      return `${sanitized || "notes"}-${Date.now()}.${extension}`;
    },

    /**
     * Private helper: Download file
     */
    _downloadFile(content, filename, mimeType) {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    },
  };
})();

// Export for use in modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = NotesManager;
}
