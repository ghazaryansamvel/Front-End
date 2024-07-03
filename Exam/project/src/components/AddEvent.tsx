import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material";
import axios from "axios";
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ActionTypes } from "../lib/types";
import { EventContext } from "../lib/Context";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
interface Inputs {
    title: string
    date: string
    time: string
    cover: string
    type: string
    composer: string
}
export const AddEvent = () => {
    const [open, setOpen] = useState<boolean>(false);

    const context = useContext(EventContext);

    if (!context) {
        throw new Error("Out of provider...");
    }
    
    const { dispatch } = context;

    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>()

    const handleAdd: SubmitHandler<Inputs> = (data) => {
        axios
            .post("http://localhost:3004/events", data)
            .then(res => {
                dispatch({ type: ActionTypes.addEvent, payload: res.data });
                setOpen(false);
                reset();
            });
    }

    return <Box my={2}>
        <Button onClick={() => setOpen(true)} variant="contained">add</Button>
        <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={style}>
                <form onSubmit={handleSubmit(handleAdd)}>
                    <Box my={2}>
                        {
                            errors.title && <p style={{ color: "red" }}>
                                Please fill the title
                            </p>
                        }
                        <TextField
                            variant="outlined"
                            label="title"
                            {...register("title", { required: true })}
                        />
                    </Box>
                    <Box my={2}>
                        {
                            errors.date && <p style={{ color: "red" }}>
                                Please fill the date
                            </p>
                        }
                        <TextField
                            variant="outlined"
                            label="date"
                            {...register("date", { required: true })}
                        />
                    </Box>
                    <Box my={2}>
                        {
                            errors.time && <p style={{ color: "red" }}>
                                Please fill the time
                            </p>
                        }
                        <TextField
                            variant="outlined"
                            label="time"
                            {...register("time", { required: true })}
                        />
                    </Box>
                    <Box my={2}>
                        {
                            errors.composer && <p style={{ color: "red" }}>
                                Please fill the composer
                            </p>
                        }
                        <TextField
                            variant="outlined"
                            label="composer"
                            {...register("composer", { required: true })}
                        />
                    </Box>
                    <Box my={2}>
                        {
                            errors.type && <p style={{ color: "red" }}>
                                Please choose opera or ballet
                            </p>
                        }
                        <Select sx={{ width: 200 }} {...register("type", { required: true })}>
                            <MenuItem value="opera">opera</MenuItem>
                            <MenuItem value="ballet">ballet</MenuItem>
                        </Select>
                    </Box>
                    <Box my={2}>
                        {
                            errors.cover && <p style={{ color: "red" }}>
                                Please fill the cover
                            </p>
                        }
                        <TextField
                            variant="outlined"
                            {...register("cover", { required: true })}
                            label="cover"
                        />
                    </Box>
                    <Button type="submit" variant="outlined">Submit</Button>
                </form>
            </Box>
        </Modal>
    </Box>
}


