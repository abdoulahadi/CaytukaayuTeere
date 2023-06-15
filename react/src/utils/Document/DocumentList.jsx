/* eslint-disable react/prop-types */
import DocumentItem from "./DocumentItem";

const DocumentList = ({ listDocument, action }) => {
    return (
        <div className="row m-0 p-0 justify-content-center">
            {
                listDocument.map((document, index) => (
                    <DocumentItem
                        key={index}
                        document={document}
                        action={action}
                    />
                ))}
        </div>
    );
};

export default DocumentList;
