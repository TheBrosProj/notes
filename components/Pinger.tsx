import React, { useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface data {
    user_id: string;
    email: string;
    last_online: string;
    blocklist: string[];
}

interface TimeAgoProps {
    //   timestamp: string;
}

export function Pinger(props: TimeAgoProps): JSX.Element {
    const { user } = useAuth();
    const [ping, setPing] = useState<data | null>(null);
    useEffect(() => {
        if (user) {
            pingDB();
        }
    }, [user])

    const pingDB = async () => {
        try {
            const response = await fetch(`/api/ping/${user.uid}`);

            if (response.ok) {
                const pingData = await response.json();
                setPing(pingData as data);
                console.log(pingData);
            } else {
                console.log("failed to reach database");
            }
        } catch (error) {
            console.log(error);
            // handleError("failed to fetch todos");
        } finally {
            // setIsLoading(false);
        }
    };
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