import { useForm } from '../../src/hooks/index';
import { FormValues } from '../api/types';
import "../index.css"

export const Page = () => {

    const { handleSubmit, register, errors } = useForm<FormValues>();

    const handleAdd = (data: FormValues) => {
        console.log(data);
    };

    return (
        <>

            <form onSubmit={handleSubmit(handleAdd)} className="p-4 bg-white rounded shadow">

                <div className="mb-4">
                    <label htmlFor="name" className="form-label">
                        Name
                    </label>
                    <input
                        {...register("name", { required: "Please fill in your name" })}
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        id="name"
                    />
                    {errors.name && (
                        <div className="invalid-feedback">
                            {errors.name}
                        </div>
                    )}
                </div>

                <div className="mb-4">
                    <label htmlFor="age" className="form-label">
                        Age
                    </label>
                    <input
                        {...register("age", { required: "Please fill in your age" })}
                        className={`form-control ${errors.age ? 'is-invalid' : ''}`}
                        id="age"
                    />
                    {errors.age && (
                        <div className="invalid-feedback">
                            {errors.age}
                        </div>
                    )}
                </div>

                <div className="d-flex justify-content-end">
                    <button className="btn btn-primary" type="submit">
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};