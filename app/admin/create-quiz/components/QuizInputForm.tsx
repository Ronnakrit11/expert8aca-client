import React, { useState, FC, useEffect } from "react";
import { Checkbox, Label, TextInput, Textarea } from "flowbite-react";
import TableQuestion from "./TableQuestion";

interface IProps {
    items: any[];
    callBack: (data: any) => void;
    onEdit: (data: any) => void;
    onDelete: (data: any) => void;
    state: any;
    setState: (data: any) => void;
}

const TIME_MINUTE_DEFULT = 120;

const AddQuiz: FC<IProps> = ({
    items,
    callBack,
    onEdit,
    onDelete,
    state,
    setState,
}) => {
    const [isCheckTotalTime, setIsCheckTotalTime] = useState(false );

    useEffect(() => {
        setIsCheckTotalTime(state.isCheckTotalTime)
    }, [state.isCheckTotalTime]);

    const handleEdit = (value) => { };

    const handleDelete = () => { };

    const handleChangeInput = (event) => {
        const { name, value } = event.target;
        if (["maxSubmissionPreTest", "maxSubmissionPostTest"].includes(name)) {
            setState((prev) => ({
                ...prev,
                [name]: validateNumber(+value),
            }));
            return;
        }
        setState((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const validatePercentage = (event) => {
        const { value } = event.target;

        let newVal = value;
        if (value < 1) {
            newVal = 1;
        }
        if (value > 100) {
            newVal = 100;
        }

        setState((prev) => ({
            ...prev,
            passPercentage: newVal,
        }));
    };

    const validateNumber = (value) => {
        if (value < 1) {
            return 1;
        }
        if (value > 10) {
            return 10;
        }
        return value;
    };

    const totalQuestion = items?.length ?? 0;
    const amountItemPassFromPercent = Math.floor(
        (state.passPercentage * totalQuestion) / 100
    );

    return (
        <div>
            <div className="flex flex-col  ">
                <div className="grid grid-cols-2 gap-10">
                    <div>
                        <div>
                            <div className="mt-2 block">
                                <Label htmlFor="small" value="Name" />
                            </div>
                            <TextInput
                                value={state.name}
                                onChange={handleChangeInput}
                                name="name"
                                id="small"
                                type="text"
                                sizing="sm"
                            />
                        </div>
                        <div>
                            <div className="mt-2 block">
                                <Label htmlFor="comment" value="Description" />
                            </div>
                            <Textarea
                                name="description"
                                id="description"
                                placeholder="Leave a comment..."
                                required
                                rows={4}
                            />
                        </div>
                    </div>

                    <div>
                        <div>
                            <div className="mt-2 block space-x-2">
                                <Label htmlFor="small" value="Pass Percentage" />
                                <span className="text-gray-400 text-sm">
                                    ({`${amountItemPassFromPercent}/${totalQuestion}`} questions)
                                </span>
                            </div>
                            <TextInput
                                onBlur={validatePercentage}
                                value={state.passPercentage}
                                onChange={handleChangeInput}
                                name="passPercentage"
                                id="small"
                                type="number"
                                sizing="sm"
                            />
                        </div>
                        <div>
                            <div className="mt-2 block">
                                <Label htmlFor="small" value="Max Submission pre test" />
                            </div>
                            <TextInput
                                value={state.maxSubmissionPreTest}
                                onChange={handleChangeInput}
                                name="maxSubmissionPreTest"
                                id="small"
                                type="number"
                                sizing="sm"
                            />
                        </div>
                        <div>
                            <div className="mt-2 block">
                                <Label htmlFor="small" value="Max Submission post test" />
                            </div>
                            <TextInput
                                value={state.maxSubmissionPostTest}
                                onChange={handleChangeInput}
                                name="maxSubmissionPostTest"
                                id="small"
                                type="number"
                                sizing="sm"
                            />
                        </div>
                        <div>
                            <div className="mt-2 block">
                                <Label htmlFor="small" value="Limit Time" />
                            </div>
                            <div className="flex items-center gap-4">
                                <Checkbox
                                    className={`${isCheckTotalTime ? "" : "mt-2"}`}
                                    id="accept"
                                    checked={isCheckTotalTime}
                                    onChange={({ target }) => {
                                        setIsCheckTotalTime(target.checked)
                                        if (target.checked && state.timeLimitMinutes === 0) {
                                            setState((prev) => ({
                                                ...prev,
                                                timeLimitMinutes: TIME_MINUTE_DEFULT,
                                            }))
                                        }
                                    }}
                                />
                                <div className="flex gap-2 items-center">
                                    {isCheckTotalTime && (
                                        <>
                                            <TextInput
                                                value={state.timeLimitMinutes}
                                                onChange={handleChangeInput}
                                                name="timeLimitMinutes"
                                                id="timeLimitMinutes"
                                                type="number"
                                                sizing="sm"
                                            />
                                            <span className="text-gray-400">minutes</span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-[50px]">
                    <TableQuestion
                        callBack={callBack}
                        items={items}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddQuiz;
