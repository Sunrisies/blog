'use client'
import React, { useState } from 'react';
import { MdEditor, MdCatalog, MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
type Component = {
  books:any
}

export default ({ books }: { books: string }) => {
  const [id] = useState('preview-only');

  return (
    <>
      <MdPreview editorId={id} modelValue={books} />
    </>
  );
};