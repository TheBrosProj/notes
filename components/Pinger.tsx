import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';


interface TimeAgoProps {
    //   timestamp: string;
}

export function Pinger(props: TimeAgoProps): JSX.Element {
    const { ping } = useAuth();

    const [timeAgo, setTimeAgo] = useState<string>('');

    useEffect(() => {
        const updateTimeAgo = () => {
            if (ping != undefined || ping != null) {

                const inputTime = new Date(ping?.last_online);
                const currentTime = new Date();

                const timeDifference = Math.floor((currentTime.getTime() - inputTime.getTime()) / 1000); // Time difference in seconds

                if (timeDifference < 60) {
                    setTimeAgo(`${timeDifference} seconds ago`);
                } else if (timeDifference < 3600) {
                    const minutes = Math.floor(timeDifference / 60);
                    setTimeAgo(`${minutes} minutes ago`);
                } else if (timeDifference < 86400) {
                    const hours = Math.floor(timeDifference / 3600);
                    setTimeAgo(`${hours} hours ago`);
                } else {
                    const days = Math.floor(timeDifference / 86400);
                    setTimeAgo(`${days} days ago`);
                }
            }
        };

        updateTimeAgo();

        // Update the time ago string every minute
        const interval = setInterval(updateTimeAgo, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [ping]);

    return <span>{timeAgo}</span>;
}