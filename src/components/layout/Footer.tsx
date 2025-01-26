"use client";

import React, { useEffect, useState } from 'react';
import ImprintDialog from '../dialogs/ImprintDialog';
import SecretAreaDialog from '../dialogs/SecretAreaDialog';
import { env } from 'process';



export default function Footer() {
    const [showImprint, setShowImprint] = useState(false);
    const [showSecretArea, setShowSecretArea] = useState(false);
    const [alreadyRickrolled, setAlreadyRickrolled] = useState(true);

    useEffect(() => {
        setAlreadyRickrolled(localStorage.getItem('alreadyRickrolled') === 'true');
    }, []);

    return (
        <React.Fragment>
            <ImprintDialog open={showImprint} onClose={() => setShowImprint(false)} />
            <SecretAreaDialog
                open={showSecretArea}
                onClose={() => { setShowSecretArea(false) }}
                setAlreadyRickrolled={setAlreadyRickrolled}
            />
            <footer className="flex flex-row max-w-6xl text-fontGray gap-x-3 md:gap-x-6 mt-48">
                <a className='hover:text-white transition-transform duration-300 text-sm md:text-md' href="https://github.com/jhKessler/slides" target='_blank'>Slides</a>
                {!alreadyRickrolled && <>
                    <span>|</span>
                    <button className='hover:text-white transition-transform duration-300 text-sm md:text-md' onClick={() => setShowSecretArea(true)}>
                        Top Secret Area
                    </button>
                </>}
                <span>|</span>
                <button className='hover:text-white transition-transform duration-300 text-sm md:text-md' onClick={() => setShowImprint(true)}>
                    Imprint
                </button>
            </footer>
        </React.Fragment>
    )
}