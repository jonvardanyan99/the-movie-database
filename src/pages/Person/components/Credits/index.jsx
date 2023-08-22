import { useParams } from 'react-router-dom';
import { useState } from 'react';
import PropTypes from 'prop-types';

import { useQuery } from '../../../../hooks/useQuery';

import { DataDisplay } from './components/DataDisplay';
import styles from './styles.module.scss';

export const Credits = ({ loading, name, knownForDepartment }) => {
    const params = useParams();
    const [mediaTypeVisible, setMediaTypeVisible] = useState(false);
    const [departmentTypeVisible, setDepartmentTypeVisible] = useState(false);
    const [mediaType, setMediaType] = useState('All');
    const [departmentType, setDepartmentType] = useState('All');
    const {loading: creditsLoading, data} = useQuery({ url: `/person/${params.id}/combined_credits`, params: '&language=en-US' });

    for (let i = 0; i <= data?.cast.length - 2; i++) {
        for (let j = i + 1; j <= data.cast.length - 1; j++) {
            if (data.cast[i].id === data.cast[j].id) {
                if (data.cast[i].hasOwnProperty('episode_count') && data.cast[j].hasOwnProperty('episode_count')) {
                    data.cast[i].secondEpisodeCount = data.cast[j].episode_count;
                };

                if (data.cast[i].hasOwnProperty('character') && data.cast[j].hasOwnProperty('character')) {
                    data.cast[i].secondCharacter = data.cast[j].character;
                };

                data.cast.splice(j, 1);
                break;
            };
        };
    };

    for (let i = 0; i <= data?.crew.length - 2; i++) {
        let k = 1;

        for (let j = i + 1; j <= data.crew.length - 1; j++) {
            if (data.crew[i].id === data.crew[j].id) {
                data.crew[j].id += k;
                k++;
            };
        };
    };

    const groupedCast = data?.cast.reduce((acc, obj) => {
        const date = obj.release_date || obj.first_air_date;
        const yearValue = date ? new Date(date).getFullYear() : 'planned';

        if (!acc[yearValue]) {
            acc[yearValue] = [];
        };

        acc[yearValue].push(obj);

        return acc;
    }, {});

    const groupedCrew = data?.crew.reduce((acc, obj) => {
        const department = obj.department;
        const date = obj.release_date || obj.first_air_date;
        const yearValue = date ? new Date(date).getFullYear() : 'planned';

        if (!acc[department]) {
            acc[department] = {};
        };

        if (!acc[department][yearValue]) {
            acc[department][yearValue] = [];
        };

        acc[department][yearValue].push(obj);

        return acc;
    }, {});

    const dataObject = { ...groupedCrew };
    if (data && Object.keys(groupedCast).length > 0) {
        dataObject['Acting'] = groupedCast;
    };

    let allData = [];

    if (data) {
        allData = Object.entries(dataObject).map(([department, data]) => {
            const entries = Object.entries(data).map(([yearValue, items]) => [yearValue, items]);
    
            return [department, entries];
        });
    };

    allData.sort(([, entriesA], [, entriesB]) => {
        const countA = entriesA.reduce((total, [, items]) => total + items.length, 0);
        const countB = entriesB.reduce((total, [, items]) => total + items.length, 0);

        return countB - countA;
    });

    allData.sort(([departmentA], [departmentB]) => {
        if (departmentA === knownForDepartment) return -1;
        if (departmentB === knownForDepartment) return 1;

        return 0;
    });

    allData.forEach(([, entries]) => {
        entries.sort(([yearA], [yearB]) => yearB.localeCompare(yearA));
    });

    const movieData = allData.reduce((acc, [department, data]) => {
        const nestedResult = data.reduce((nestedAcc, [yearValue, items]) => {
            const filteredItems = items.filter(item => item.media_type === 'movie');

            if (filteredItems.length > 0) {
                nestedAcc.push([yearValue, filteredItems]);
            };

            return nestedAcc;
        }, []);

        if (nestedResult.length > 0) {
            acc.push([department, nestedResult]);
        };

        return acc;
    }, []);

    const tvData = allData.reduce((acc, [department, data]) => {
        const nestedResult = data.reduce((nestedAcc, [yearValue, items]) => {
            const filteredItems = items.filter(item => item.media_type === 'tv');

            if (filteredItems.length > 0) {
                nestedAcc.push([yearValue, filteredItems]);
            };

            return nestedAcc;
        }, []);

        if (nestedResult.length > 0) {
            acc.push([department, nestedResult]);
        };

        return acc;
    }, []);

    const uniqueMovieNames = new Set();
    const uniqueTvNames = new Set();

    for (const item of movieData) {
        for (const nestedItem of item[1]) {
            for (const obj of nestedItem[1]) {
                uniqueMovieNames.add(obj.title);
            };
        };
    };
    
    for (const item of tvData) {
        for (const nestedItem of item[1]) {
            for (const obj of nestedItem[1]) {
                uniqueTvNames.add(obj.name);
            };
        };
    };

    const movieCount = uniqueMovieNames.size;
    const tvCount = uniqueTvNames.size;

    const departmentsList = allData.map(([department, data]) => {
        const dataLength = data.reduce((acc, [, items]) => acc + items.length, 0);

        return [department, dataLength];
    });

    departmentsList.sort(([, lengthA], [, lengthB]) => lengthB - lengthA);

    const selectedDepartment = departmentType !== 'All' ? (
        allData.filter(item => item[0] === departmentType)
    ) : null;

    const toggleMediaType = () => {
        setMediaTypeVisible(!mediaTypeVisible);
        setDepartmentTypeVisible(false);
    };

    const toggleDepartmentType = () => {
        setDepartmentTypeVisible(!departmentTypeVisible);
        setMediaTypeVisible(false);
    };

    const handleMediaTypeChange = newMediaType => {
        setMediaType(newMediaType);
        setDepartmentType('All');
    };

    const handleDepartmentTypeChange = newDepartmentType => {
        setDepartmentType(newDepartmentType);
        setMediaType('All');
    };

    const handleClearTypes = () => {
        setMediaType('All');
        setDepartmentType('All');
    };

    return (
        <div className={styles.credits}>
            <ul>
                {(mediaType !== 'All' || departmentType !== 'All') ?
                <li className={styles.clear} onClick={handleClearTypes}>Clear</li> : null}
                <li className={styles['media-type']} onClick={toggleMediaType}>
                    All
                    {mediaTypeVisible &&
                    <ul>
                        <li onClick={() => handleMediaTypeChange('Movies')}>
                            Movies <span>{movieCount}</span>
                        </li>
                        <li onClick={() => handleMediaTypeChange('TV Shows')}>
                            TV Shows <span>{tvCount}</span>
                        </li>
                    </ul>}
                </li>
                <li className={styles.department} onClick={toggleDepartmentType}>
                    Department
                    {departmentTypeVisible &&
                    <ul>
                        {departmentsList.map((item, index) => (
                            <li key={index} onClick={() => handleDepartmentTypeChange(item[0])}>
                                {item[0]} <span>{item[1]}</span>
                            </li>
                        ))}
                    </ul>}
                </li>
            </ul>
            <DataDisplay
                loading={loading}
                creditsLoading={creditsLoading}
                data={
                    selectedDepartment ? selectedDepartment :
                    mediaType === 'Movies' ? movieData :
                    mediaType === 'TV Shows' ? tvData :
                    allData
                }
                name={name}
            />
        </div>
    );
};

Credits.propTypes = {
    loading: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    knownForDepartment: PropTypes.string.isRequired,
};