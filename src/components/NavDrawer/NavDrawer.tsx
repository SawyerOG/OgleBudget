import React from 'react';
import './NavDrawer.css';

interface Props {
    isShowing: boolean;
    selectedLink: string;
    toggleDrawer: () => void;
    setSelectedLink: (link: string) => void;
}

interface LinkProps {
    link: string;
    isSelected: boolean;
    select: (link: string) => void;
}

const links = ['Add Expenses', 'Add Incomes', 'Edit Expense Categories', 'Monthly Rundown'];

const Link: React.FC<LinkProps> = ({ link, isSelected, select }) => (
    <p className={`${isSelected ? 'text-success' : 'text-info'} fs-5`} onClick={() => select(link)}>
        {link}
    </p>
);

const NavDrawer: React.FC<Props> = ({ isShowing, selectedLink, setSelectedLink, toggleDrawer }) => {
    const selectLinkHandler = (link: string) => {
        setSelectedLink(link);
        toggleDrawer();
    };

    return (
        <>
            <div className={`Backdrop ${isShowing ? 'ShowDrop' : 'NoShowDrop'}`} onClick={toggleDrawer} />
            <div
                className={`NavDrawer-Cont text-center pt-4 border-end border-info border-3 ${
                    isShowing ? 'Show' : 'NoShow'
                }`}
            >
                {links.map((i) => (
                    <Link key={i} link={i} isSelected={selectedLink === i} select={() => selectLinkHandler(i)} />
                ))}
            </div>
        </>
    );
};

export default NavDrawer;
