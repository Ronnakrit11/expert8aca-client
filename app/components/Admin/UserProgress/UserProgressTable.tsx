"use client";

import React, { useEffect } from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { useGetAllCoursesQuery } from '@/redux/features/courses/coursesApi';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 150 },
    {
        field: 'progress',
        headerName: 'Progress',
        width: 140,
        sortable: false
    },
    {
        field: 'watch_time',
        headerName: 'Watched Time',
        width: 140,
        sortable: false
    },
];

const UserProgressTable = () => {
    const { isLoading, data: allCourse, refetch } = useGetAllCoursesQuery(
        {},
        { refetchOnMountOrArgChange: true }
    );
    const [userProgressList, setUserProgressList] = React.useState([])
    const [selectedCourseId, setSelectedCourseId] = React.useState('')
    const [courseOptions, setCourseOptions] = React.useState([])
    const [dataTable, setDataTable] = React.useState([])
    const [loadingTable, setLoadingTable] = React.useState(false)

    useEffect(() => {
        if (allCourse?.courses?.length > 0) {
            setSelectedCourseId(allCourse.courses[0]._id)
            const options = allCourse.courses.map((course) => {
                return {
                    value: course._id,
                    label: course.name,
                    total_video: course?.courseData?.length
                }
            })
            setCourseOptions(options)
            fetchUserProgress(allCourse.courses[0]._id)
        }

    }, [allCourse])

    const getCurrentCourse = (courseId) => {
        return courseOptions.find((course: any) => course.value === courseId)
    }

    console.log("🚀 ~ UserProgressTable ~ allCourse:", allCourse)
    useEffect(() => {
        console.log('UserProgressTable')
    }, [])

    const convertSecToMinOrHour = (sec) => {
        const hours = Math.floor(sec / 3600);
        const minutes = Math.floor((sec - (hours * 3600)) / 60);
        const seconds = sec - (hours * 3600) - (minutes * 60);
        let time = '';
        if (hours > 0) {
            time += hours + ' ชั่วโมง ';
        }
        if (minutes > 0) {
            time += minutes + ' นาที ';
        }
        // if (seconds > 0) {
        //     time += seconds + ' วินาที ';
        // }
        return time;
    }

    const fetchUserProgress = async (courseId) => {
        setLoadingTable(true)
        try {
            const result = await axios.get(`/api/v1/user-progress-report/${courseId}`, {
                withCredentials: true
            })
            if (result.data.results.length) {
                const currentCourse: any = getCurrentCourse(courseId)
                const data = result.data.results.map((item, idx) => {
                    const progress = ((item.video_compleated_id.length || 0) / (currentCourse?.total_video || 1) * 100)
                    return {
                        id: +idx,
                        name: item.user_id?.name,
                        email: item.user_id?.email,
                        progress: progress?.toFixed(2) + '%',
                        watch_time: convertSecToMinOrHour(item.total_watch_time)
                    }
                })
                setDataTable(data)

            } else {
                setDataTable([])
            }
        } catch (err) {
            console.log(err)
        }

        setLoadingTable(false)
    }

    const handleChangeCourse = (e) => {
        const value = e.target.value
        setSelectedCourseId(value)
        fetchUserProgress(value)
    }

    return (
        <div>
            <div>
                <select
                    value={selectedCourseId}
                    onChange={handleChangeCourse}
                >
                    {courseOptions.map((option: any) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            <div className="overflow-x-auto mt-5 pr-10">
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        loading={loadingTable}
                        rows={dataTable}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection={false}
                        disableRowSelectionOnClick
                    />
                </div>
            </div>
        </div>
    )
}

export default UserProgressTable