import React from "react";
import {
  PdfViewerComponent,
  Toolbar,
  Magnification,
  Navigation,
  LinkAnnotation,
  BookmarkView,
  ThumbnailView,
  Print,
  TextSelection,
  TextSearch,
  Annotation,
  FormFields,
  FormDesigner,
  Inject,
} from "@syncfusion/ej2-react-pdfviewer";

const custompdf = () => {
  return (
    <div>
      {/* <PdfViewerComponent
        id="container"
        documentPath=""
        serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/pdfviewer"
        style={{ height: "640px" }}
      >
        <Inject
          services={[
            Toolbar,
            Magnification,
            Navigation,
            LinkAnnotation,
            BookmarkView,
            ThumbnailView,
            Print,
            TextSelection,
            TextSearch,
            Annotation,
            FormFields,
            FormDesigner,
          ]}
        />
      </PdfViewerComponent> */}
    </div>
  );
};

export default custompdf;
