import { MoreVert, UnfoldMore } from "@mui/icons-material";
import { CircularProgress, IconButton } from "@mui/material";
import axios from "axios";
import PropTypes from "prop-types";
import { useId } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../service";

export const Template = ({ src, alt, templateName, onClick }) => {
  return (
    <div>
      <img
        src={src}
        alt={alt}
        className="h-[186px] w-[144px]  border-[1px] rounded hover:border-blue-400 cursor-pointer"
        onClick={onClick}
      />
      <p className="text-base font-normal mt-2">{templateName}</p>
    </div>
  );
};

Template.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  templateName: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export const DocumentTemplates = () => {
  // navigate to /document/:id when create function called with an id created using useId hook
  const navigate = useNavigate();

  const newDocId = crypto.randomUUID();
  const createDocumentMutation = useMutation({
    mutationFn: async () => {
      const { data } = await axiosInstance.post(
        "/documents",
        {
          data: {},
          name: "",
        },
        {
          withCredentials: true,
        }
      );

      return data;
    },
    onSuccess: (data) => {
      console.log(data);
      navigate(`/document/${data.id}`);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const createNewDocument = () => {
    createDocumentMutation.mutate({});
  };

  return (
    <>
      <div className="bg-gray-lightest flex justify-center">
        <div className="max-w-4xl w-full py-4">
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
              onClick={createNewDocument}
            />
          </div>
        </div>
      </div>
      <div
        className={`absolute h-screen w-full flex justify-center items-center ${
          createDocumentMutation.isLoading ? "block" : "hidden"
        }`}
      >
        <CircularProgress />
      </div>
    </>
  );
};
