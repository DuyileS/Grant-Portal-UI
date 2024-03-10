export { default as SignupView } from './signup-view';

/* 

<section className="max-h-screen">
  <div className="my-20">
    <div className="w-[350px] h-[500px] bg-white p-5 m-auto rounded-lg shadow-2xl">
      <form onSubmit={handleSubmit} className="w-full" method="dialog">
        <div className="flex w-full justify-between items-center my-5">
          <h3 className="font-bold text-2xl">Signup</h3>

          <Link to="/" className="btn btn-sm btn-circle btn-ghost">
            ✕
          </Link>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Firstname</span>
          </label>
          <input
            placeholder="firstname"
            className="input w-full input-bordered"
            required
            name="firstname"
            id="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Lastname</span>
          </label>
          <input
            placeholder="lastname"
            className="input input-bordered"
            required
            name="lastname"
            id="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            required
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone Number</span>
          </label>
          <input
            type="tel"
            placeholder="Phone Number"
            className="input input-bordered"
            required
            name="phoneNumber"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date of Birth</span>
          </label>
          <input
            type = "date"
            placeholder="DOB"
            className="input input-bordered"
            required
            name="dateOfBirth"
            id="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </div>
        { eslint-disable-next-line jsx-a11y/label-has-associated-control }
        <div className="form-control">
          <label htmlFor="password" className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            required
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-control mt-6">
          <input
            type="submit"
            value="Sign Up"
            className="btn bg-[#191D31] hover:bg-[#151D31] text-[#E8E6EA]"
          />
        </div>
      </form>
    </div>
  </div>
</section>

*/