import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal, Typography } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { useTheme } from "next-themes";
import { FiEdit2 } from "react-icons/fi";
import {
    useDeleteCourseMutation,
    useGetAllCoursesQuery,
} from "@/redux/features/courses/coursesApi";
import AddIcon from '@mui/icons-material/Add';
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { styles } from "@/app/styles/style";
import { toast } from "react-hot-toast";
import Link from "next/link";
import { useDeleteEbookMutation, useGetAllEbookQuery } from "@/redux/features/ebooks/ebookApi";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import SimpleBackdrop from "../../Loading/SimpleBackdrop";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

type Props = {};

const AllEbook = (props: Props) => {
    const { theme, setTheme } = useTheme();
    const [open, setOpen] = useState(false);
    const [openModalAdd, setOpenModalAdd] = useState(false);
    const [ebookId, setEbookId] = useState("");
    const { isLoading, data, refetch } = useGetAllEbookQuery<any>(
        {},
        { refetchOnMountOrArgChange: true }
    );
    const [deleteEbook, { isSuccess, error, isLoading: isLoadingDel }] = useDeleteEbookMutation<any>({});

    const [courseInfo, setCourseInfo] = useState({}) as any;

    const columns = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "name", headerName: "ebook name", flex: 1 },
        { field: "purchased", headerName: "Purchased", flex: 0.5 },
        { field: "created_at", headerName: "Created At", flex: 0.5 },
        {
            field: "  ",
            headerName: "Edit",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Link href={`/admin/edit-ebook/${params.row.id}`}>
                            <FiEdit2 className="dark:text-white text-black" size={20} />
                        </Link>
                    </>
                );
            },
        },
        {
            field: " ",
            headerName: "Delete",
            flex: 0.2,
            renderCell: (params: any) => {
                return (
                    <>
                        <Button
                            onClick={() => {
                                setOpen(!open);
                                setEbookId(params.row.id);
                            }}
                        >
                            <AiOutlineDelete
                                className="dark:text-white text-black"
                                size={20}
                            />
                        </Button>
                    </>
                );
            },
        },
    ];

    const rows: any = [];

    {
        data &&
            data.ebooks.forEach((item: any) => {
                rows.push({
                    id: item._id,
                    name: item.name,
                    purchased: item.purchased,
                    created_at: format(item.createdAt),
                });
            });
    }

    useEffect(() => {
        if (isSuccess) {
            setOpen(false);
            refetch();
            toast.success("Course Deleted Successfully");
        }
        if (error) {
            if ("data" in error) {
                const errorMessage = error as any;
                toast.error(errorMessage.data.message);
            }
        }
    }, [isSuccess, error, refetch]);

    const handleDelete = async () => {
        const id = ebookId;
        await deleteEbook(id);
    };

    const handleCloseModalAdd = () => {
        setOpenModalAdd(false)
    }

    const handleSubmit = () => {

    }

    return (
        <div className="mt-[120px]">
            {isLoading ? (
                <Loader />
            ) : (
                <Box m="20px">
                    <Box
                        m="40px 0 0 0"
                        height="80vh"
                        sx={{
                            "& .MuiDataGrid-root": {
                                border: "none",
                                outline: "none",
                            },
                            "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                            "& .MuiDataGrid-sortIcon": {
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                            "& .MuiDataGrid-row": {
                                color: theme === "dark" ? "#fff" : "#000",
                                borderBottom:
                                    theme === "dark"
                                        ? "1px solid #ffffff30!important"
                                        : "1px solid #ccc!important",
                            },
                            "& .MuiTablePagination-root": {
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                            "& .MuiDataGrid-cell": {
                                borderBottom: "none!important",
                            },
                            "& .name-column--cell": {
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                                borderBottom: "none",
                                color: theme === "dark" ? "#fff" : "#000",
                            },
                            "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
                            },
                            "& .MuiDataGrid-footerContainer": {
                                color: theme === "dark" ? "#fff" : "#000",
                                borderTop: "none",
                                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                            },
                            "& .MuiCheckbox-root": {
                                color:
                                    theme === "dark" ? `#b7ebde !important` : `#000 !important`,
                            },
                            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                                color: `#fff !important`,
                            },
                        }}
                    >
                        <DataGrid checkboxSelection rows={rows} columns={columns} />
                    </Box>
                    {open && (
                        <Modal
                            open={open}
                            onClose={() => setOpen(!open)}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description"
                        >
                            <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                                <h1 className={`${styles.title}`}>
                                    Are you sure you want to delete this course?
                                </h1>
                                <div className="flex w-full items-center justify-between mb-6 mt-4">
                                    <div
                                        className={`${styles.button} !w-[120px] h-[30px] bg-[#47d097]`}
                                        onClick={() => setOpen(!open)}
                                    >
                                        Cancel
                                    </div>
                                    <div
                                        className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </div>
                                </div>
                            </Box>
                        </Modal>
                    )}

                    {
                        openModalAdd && <Dialog
                            className="z-999"
                            open={openModalAdd}
                            TransitionComponent={Transition}
                            keepMounted
                            onClose={handleCloseModalAdd}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            {/* <DialogTitle>Add Ebook</DialogTitle> */}
                            <DialogContent className=" bg-white dark:bg-slate-900  shadow p-4 ">
                                <form onSubmit={handleSubmit} className={`${styles.label}`}>
                                    <div>
                                        <label htmlFor="">Ebook Name</label>
                                        <input
                                            type="name"
                                            name=""
                                            required
                                            value={courseInfo.name}
                                            onChange={(e: any) =>
                                                setCourseInfo({ ...courseInfo, name: e.target.value })
                                            }
                                            id="name"
                                            placeholder="MERN stack LMS platform with next 13"
                                            className={`
            ${styles.input}`}
                                        />
                                    </div>
                                    <br />
                                    <div className="mb-5">
                                        <label className={`${styles.label}`}>Ebook Description</label>
                                        <textarea
                                            name=""
                                            id=""
                                            cols={30}
                                            rows={8}
                                            placeholder="Write something amazing..."
                                            className={`${styles.input} !h-min !py-2`}
                                            value={courseInfo.description}
                                            onChange={(e: any) =>
                                                setCourseInfo({ ...courseInfo, description: e.target.value })
                                            }
                                        ></textarea>
                                    </div>
                                    <br />
                                    <div className="w-full flex justify-between">
                                        <div className="w-[45%]">
                                            <label className={`${styles.label}`}>Ebook Price</label>
                                            <input
                                                type="number"
                                                name=""
                                                required
                                                value={courseInfo.price}
                                                onChange={(e: any) =>
                                                    setCourseInfo({ ...courseInfo, price: e.target.value })
                                                }
                                                id="price"
                                                placeholder="29"
                                                className={`
            ${styles.input}`}
                                            />
                                        </div>
                                        <div className="w-[50%]">
                                            <label className={`${styles.label} w-[50%]`}>
                                                Estimated Price (optional)
                                            </label>
                                            <input
                                                type="number"
                                                name=""
                                                value={courseInfo.estimatedPrice}
                                                onChange={(e: any) =>
                                                    setCourseInfo({ ...courseInfo, estimatedPrice: e.target.value })
                                                }
                                                id="price"
                                                placeholder="79"
                                                className={`
            ${styles.input}`}
                                            />
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    {/* <div className="w-full">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            id="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                        <label
                                            htmlFor="file"
                                            className={`w-full min-h-[10vh] dark:border-white border-[#00000026] p-3 border flex items-center justify-center ${dragging ? "bg-blue-500" : "bg-transparent"
                                                }`}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                        >
                                            {courseInfo.thumbnail ? (
                                                <img
                                                    src={courseInfo.thumbnail}
                                                    alt=""
                                                    className="max-h-full w-full object-cover"
                                                />
                                            ) : (
                                                <span className="text-black dark:text-white">
                                                    Drag and drop your thumbnail here or click to browse
                                                </span>
                                            )}
                                        </label>
                                    </div> */}
                                    <br />
                                    <div className="w-full flex items-center justify-end">
                                        <input
                                            type="submit"
                                            value="Save"
                                            className="w-full 800px:w-[180px] h-[40px] bg-[#37a39a] text-center text-[#fff] rounded mt-8 cursor-pointer"
                                        />
                                    </div>
                                    <br />
                                    <br />
                                </form>
                            </DialogContent>
                            {/* <DialogActions>
                                <Button onClick={handleCloseModalAdd}>Close</Button>
                                <Button variant="contained" onClick={handleCloseModalAdd}>Save</Button>
                            </DialogActions> */}
                        </Dialog>
                    }
                </Box>
            )}
            <SimpleBackdrop open={isLoadingDel} />
        </div>
    );
};

export default AllEbook;
