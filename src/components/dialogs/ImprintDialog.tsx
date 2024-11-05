import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";

// ImprintDialog Component
export default function ImprintDialog({ open, onClose }: {
    open: boolean;
    onClose: () => void;
}) {
    return (
        <Dialog
            open={open}
            handler={onClose}
            className="bg-white/5 backdrop-blur-xl backdrop-filter rounded-2xl"
        >
            <DialogHeader className="flex flex-row text-white justify-between">
                <span>Imprint</span>
                <button>
                    <IoClose
                        className="text-white hover:text-primary transition-colors duration-300"
                        onClick={onClose}
                    />
                </button>
            </DialogHeader>
            <DialogBody className="text-white">
                Responsible for the content of this website: <br />
                Johnny Kessler <br />
                Grindelallee 7 <br />
                20146 Hamburg <br />
                Contact: contact@johnny-kessler.dev
            </DialogBody>
        </Dialog>
    );
}
