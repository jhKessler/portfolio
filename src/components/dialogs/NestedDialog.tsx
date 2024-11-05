import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";

export default function NestedDialog({
    open,
    title,
    text,
    confirmText,
    cancelText,
    onConfirm,
    onClose,
    size,
    innerDialog
}: {
    open: boolean;
    title: string;
    text: string;
    confirmText: string;
    cancelText: string;
    onConfirm: () => void;
    onClose: () => void;
    size?: "sm" | "md" | "lg" | "xl";
    innerDialog?: React.ReactNode;
}) {
    return (
        <Dialog
            open={open}
            handler={onClose}
            className="bg-white/5 backdrop-blur-xl backdrop-filter rounded-2xl"
            size={size}
        >
            {innerDialog}
            <DialogHeader className="flex flex-row text-white justify-between">
                <span>{title}</span>
                <button onClick={onClose}>
                    <IoClose className="text-white transition-colors duration-300" />
                </button>
            </DialogHeader>
            <DialogBody className="text-white">{text}</DialogBody>
            <DialogFooter>
                <Button variant="text" color="red" onClick={onClose} className="mr-1">
                    <span>{cancelText}</span>
                </Button>
                <Button
                    variant="outlined"
                    color="green"
                    onClick={onConfirm}
                >
                    <span>{confirmText}</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}