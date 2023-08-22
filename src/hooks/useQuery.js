import { useState, useEffect } from 'react';

import { TMDB_API_KEY } from '../configs';

export const useQuery = ({ url, params, skip }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        if (!skip) {
            setLoading(true);

            fetch(`https://api.themoviedb.org/3${url}?api_key=${TMDB_API_KEY}${params}`)
                .then(response => response.json())
                .then(data => {
                    setData(data);
                    setLoading(false);
                });
        };
    }, [url, params, skip]);

    return {loading, data};
};