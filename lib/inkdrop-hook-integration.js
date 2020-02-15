"use babel";

import fs from "fs";

module.exports = {
  config: {
    outputFile: {
      title: "Output File",
      type: "string",
      required: true,
      default: `${__dirname}/current-inkdrop-note.tmp`
    }
  },

  activate() {
    this.unsubscribe = inkdrop.store.subscribe(() => this.writeEditingNote());
    this.editingNoteId = null;
  },

  async writeEditingNote() {
    const { editingNote } = inkdrop.store.getState();
    if (!editingNote || editingNote._id === this.editingNoteId) return;
    this.editingNoteId = editingNote._id;
    const { outputFile } = inkdrop.config.get("inkdrop-hook-integration");

    fs.writeFileSync(
      outputFile,
      `[${editingNote.title}](inkdrop://${editingNote._id})`
    );
  },

  deactivate() {
    this.unsubscribe();
  }
};
