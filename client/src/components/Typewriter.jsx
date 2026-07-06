import React, { useState, useEffect } from 'react';

function Typewriter()
{

    const strings = [
        "C-DAC MOHALI",
        "Centre for Development of Advanced Computing",
        "Digital Innovation Hub",
        "Advanced Computing Centre",
        "Innovation & Research Centre"
    ];

    const [currentStringIndex, setCurrentStringIndex] = useState(0);
    const [currentString, setCurrentString] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() =>
    {
        if (isTyping)
        {
            if (currentString === strings[currentStringIndex])
            {
                setTimeout(() =>
                {
                    setIsTyping(false);
                }, 500); // Adjust the pause duration before erasing (in milliseconds)
            } else
            {
                const timeout = setTimeout(() =>
                {
                    setCurrentString(strings[currentStringIndex].slice(0, currentString.length + 1));
                }, 100); // Adjust the typing speed here (in milliseconds)

                return () => clearTimeout(timeout);
            }
        } else
        {
            if (currentString === '')
            {
                setCurrentStringIndex((prevIndex) => (prevIndex + 1) % strings.length);
                setIsTyping(true);
            } else
            {
                const timeout = setTimeout(() =>
                {
                    setCurrentString(currentString.slice(0, currentString.length - 1));
                }, 50); // Adjust the erasing speed here (in milliseconds)

                return () => clearTimeout(timeout);
            }
        }
    }, [currentString, currentStringIndex, isTyping]);

    return (
        <span>
            {currentString}
        </span>
    );
};

export default Typewriter;