import { MoreVert, UnfoldMore } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import PropTypes from "prop-types";

export const Template = ({ src, alt, templateName }) => {
  return (
    <div>
      <img src={src} alt={alt} className="h-[186px] w-[144px]  border-[1px] rounded hover:border-blue-400 cursor-pointer" />
      <p className="text-base font-normal mt-2">{templateName}</p>
    </div>
  );
};

Template.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  templateName: PropTypes.string.isRequired,
};

export const DocumentTemplates = () => {
  return (
    <div className="bg-gray-lightest flex justify-center">
      <div className="max-w-3xl w-full py-4">
        <div className="flex justify-between items-center relative">
          <h3 className="text-base">Start a new document</h3>
          <div className="flex items-center">
            <div className="flex gap-[5px] items-center text-gray-dark cursor-pointer hover:bg-gray-200 p-1.5 rounded-lg">
              <h3>Template Gallery</h3>
              <UnfoldMore style={{ width: 24, height: 24 }} />
            </div>
            <IconButton className="text-gray-light">
              <MoreVert />
            </IconButton>
          </div>
        </div>
        <div className="mt-2">
          <Template
            src="https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png"
            alt="new-document"
            templateName="Blank"
          />
        </div>
      </div>
    </div>
  );
};
