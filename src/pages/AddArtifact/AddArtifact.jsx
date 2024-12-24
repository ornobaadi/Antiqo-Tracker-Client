const AddArtifact = () => {
    return (
        <div className="container mx-auto px-5 py-10">
            <h2 className="text-4xl text-center font-bold text-gray-800 mb-10">Add a New Artifact</h2>
            <form className="bg-white shadow-lg rounded-lg p-8 space-y-6">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium text-gray-700">Artifact Name</span>
                    </label>
                    <input type="text" placeholder="Enter artifact name" className="input input-bordered w-full" required />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium text-gray-700">Artifact Image (URL)</span>
                    </label>
                    <input type="url" placeholder="Enter valid image URL" className="input input-bordered w-full" required />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium text-gray-700">Artifact Type</span>
                    </label>
                    <select className="select select-bordered w-full" required>
                        <option value="">Select a type</option>
                        <option value="Tools">Tools</option>
                        <option value="Weapons">Weapons</option>
                        <option value="Documents">Documents</option>
                        <option value="Writings">Writings</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium text-gray-700">Historical Context</span>
                    </label>
                    <textarea 
                        placeholder="Provide historical context..." 
                        className="textarea textarea-bordered w-full" 
                        rows="4"
                        required
                    ></textarea>
                </div>

                <div className="form-control grid grid-cols-2 gap-4">
                    <div>
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">Created At</span>
                        </label>
                        <input type="text" placeholder="e.g., 100 BC" className="input input-bordered w-full" required />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">Discovered At</span>
                        </label>
                        <input type="text" placeholder="e.g., 1799" className="input input-bordered w-full" required />
                    </div>
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium text-gray-700">Discovered By</span>
                    </label>
                    <input type="text" placeholder="Enter name of discoverer" className="input input-bordered w-full" required />
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text font-medium text-gray-700">Present Location</span>
                    </label>
                    <input type="text" placeholder="Enter present location" className="input input-bordered w-full" required />
                </div>

                {/* <div className="form-control grid grid-cols-2 gap-4">
                    <div>
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">Your Name</span>
                        </label>
                        <input type="text" value="Logged-in User Name" className="input input-bordered w-full" readOnly />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text font-medium text-gray-700">Your Email</span>
                        </label>
                        <input type="email" value="user@example.com" className="input input-bordered w-full" readOnly />
                    </div>
                </div> */}

                <div className="form-control mt-6">
                    <button className="btn btn-primary w-full text-lg">Add Artifact</button>
                </div>
            </form>
        </div>
    );
};

export default AddArtifact;
