"use client";

import React, { useState } from "react";
import NestedDialog from "./NestedDialog";

export default function SecretAreaDialog({ open, onClose }: {
    open: boolean;
    onClose: () => void;
}) {
    const [showSecretAreaConfirmation1, setShowSecretAreaConfirmation1] = useState(false);
    const [showSecretAreaConfirmation2, setShowSecretAreaConfirmation2] = useState(false);

    return (
        <NestedDialog 
            open={open}
            title="Top Secret Area"
            text="Before you enter the top secret area, you have to pinky swear that you are authorized to enter this area. Lying is not allowed so please don't lie ok?"
            confirmText="Pinky swear"
            cancelText="I am not authorized"
            onConfirm={() => setShowSecretAreaConfirmation1(true)}
            onClose={onClose}
            size="lg"
            innerDialog={
                <NestedDialog
                    open={showSecretAreaConfirmation1}
                    title="Top Secret Area"
                    text="Are you really sure you are authorized to enter this area?"
                    confirmText="yes"
                    cancelText="not sure"
                    onConfirm={() => setShowSecretAreaConfirmation2(true)}
                    onClose={() => setShowSecretAreaConfirmation1(false)}
                    size="md"
                    innerDialog={
                        <NestedDialog
                            open={showSecretAreaConfirmation2}
                            title="Top Secret Area"
                            text="100% sure?"
                            confirmText="Yes"
                            cancelText="No, go back"
                            onConfirm={() => {
                                window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank');
                                setShowSecretAreaConfirmation2(false);
                                setShowSecretAreaConfirmation1(false);
                                onClose();
                            }}
                            onClose={() => setShowSecretAreaConfirmation2(false)}
                            size="sm"
                        />
                    }
                />
            }
        />
    );
}
