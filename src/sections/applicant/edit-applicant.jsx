/* import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { ModalStore } from "../Context/States";
import { Button, Chip, Skeleton, TextField } from "@mui/material";
import { formatNormalDate } from "../Utils/helpers";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: "fit-content",
  maxHeight: 430,
  bgcolor: "background.paper",
  border: "2px solid green",
  boxShadow: 24,
  p: 4,
};

export default function PatientModal() {
  const open = ModalStore(store => store.open);
  const modalDetails = ModalStore(store => store.modalDetails);
  const hideModal = ModalStore(store => store.hideModal);

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={hideModal}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style} className="rounded-2xl flex flex-col gap-4">
          <h2 className="text-xl font-medium">Patient Details</h2>
          <div className="modal-box flex flex-col gap-4 h-full relative overflow-y-auto">
            {!modalDetails && (
              <>
                <Skeleton width={"100%"} height={"50px"} />
                <Skeleton width={"100%"} height={"50px"} />
                <Skeleton width={"100%"} height={"50px"} />
              </>
            )}
            {modalDetails && (
              <TextField
                label="Hospital Number"
                value={modalDetails?.hospitalNumber || "  "}
                InputProps={{
                  readOnly: true,
                }}
                fullWidth
                variant="filled"
                color="success"
              />
            )}
            <div className="flex gap-3">
              {!modalDetails && (
                <>
                  <Skeleton width={"100%"} height={"50px"} />
                  <Skeleton width={"100%"} height={"50px"} />
                  <Skeleton width={"100%"} height={"50px"} />
                </>
              )}
              {modalDetails && (
                <>
                  <TextField
                    label="First Name"
                    value={modalDetails?.firstName || "  "}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    variant="filled"
                    color="success"
                    placeholder=""
                  />

                  <TextField
                    label="Last Name"
                    value={modalDetails?.lastName || "  "}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    variant="filled"
                    color="success"
                  />
                </>
              )}
            </div>

            <div className="flex gap-3">
              {!modalDetails && (
                <>
                  <Skeleton width={"100%"} height={"50px"} />
                  <Skeleton width={"100%"} height={"50px"} />
                  <Skeleton width={"100%"} height={"50px"} />
                </>
              )}
              {modalDetails && (
                <>
                  <TextField
                    label="Gender"
                    value={modalDetails?.gender || "  "}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    variant="filled"
                    color="success"
                  />
                  <TextField
                    label="Date of Birth"
                    value={
                      formatNormalDate(modalDetails?.dateOfBirth) || "  "
                    }
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    variant="filled"
                    color="success"
                  />
                </>
              )}
            </div>
            <div className="flex gap-3">
              {!modalDetails && (
                <>
                  <Skeleton width={"100%"} height={"50px"} />
                  <Skeleton width={"100%"} height={"50px"} />
                  <Skeleton width={"100%"} height={"50px"} />
                </>
              )}
              {modalDetails && (
                <>
                  <TextField
                    label="Blood Group"
                    value={modalDetails.bloodgroup}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    variant="filled"
                    color="success"
                  />
                  <TextField
                    label="Genotype"
                    value={modalDetails.genotype}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    variant="filled"
                    color="success"
                  />
                  <Chip
                    label={modalDetails.status.toLocaleUpperCase()}
                    className={`!h-12 ${
                      modalDetails.status === "good"
                        ? "!bg-[rgb(94,218,94,0.5)]"
                        : modalDetails.status === "abnormal"
                        ? "!bg-[rgb(227,189,51,0.5)]"
                        : "!bg-[rgb(218,94,94,0.5)]"
                    } font-bold !rounded-3xl min-w-fit !w-[300px]`}
                  />
                </>
              )}
            </div>
            <div className="flex gap-3">
              {!modalDetails && (
                <>
                  <Skeleton width={"100%"} height={"50px"} />
                  <Skeleton width={"100%"} height={"50px"} />
                  <Skeleton width={"100%"} height={"50px"} />
                </>
              )}
              {modalDetails && (
                <>
                  <TextField
                    label="Phone Number"
                    value={modalDetails.phone_number}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    variant="filled"
                    color="success"
                  />
                  <TextField
                    label="Emergency Contact 1"
                    value={modalDetails.emergencyContact1}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    variant="filled"
                    color="success"
                  />
                  <TextField
                    label="Emergency Contact 2"
                    value={modalDetails.emergencyContact2}
                    InputProps={{
                      readOnly: true,
                    }}
                    fullWidth
                    variant="filled"
                    color="success"
                  />
                </>
              )}
            </div>
          </div>
          <hr className="border-1 border-[#BFEA7C]" />
          <div className="flex items-center justify-between">
            <Link
              to={{
                pathname: `vitals`,
                search: `hospitalNumber=${
                  modalDetails
                    ? encodeURIComponent(modalDetails!.hospitalNumber)
                    : ""
                }`,
              }}
              onClick={hideModal}
            >
              <Button color="primary" variant="contained" size="large">
                View Vitals
              </Button>
            </Link>
            <Link
              to={{
                pathname: `medication`,
                search: `hospitalNumber=${
                  modalDetails
                    ? encodeURIComponent(modalDetails!.hospitalNumber)
                    : ""
                }`,
              }}
              onClick={hideModal}
            >
              <Button color="warning" variant="contained" size="large">
                View Medication
              </Button>
            </Link>

            <Button
              color="error"
              variant="outlined"
              size="large"
              onClick={hideModal}
            >
              Close
            </Button>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
}
*/