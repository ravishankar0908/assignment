import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Modal,
  Input,
  Divider,
  Select,
  Slider,
  Button,
  DatePicker,
  Card,
} from "antd";
import {
  MapPin,
  Search,
  UserRoundCog,
  ChevronsRight,
  ChevronsDown,
  ArrowUpDown,
  UserPlus,
  Building2,
  Layers,
} from "lucide-react";
import { getAllJobs, insertJobs } from "./services/jobService";
function App() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      companyName: "",
      location: "",
      jobType: "",
      salaryRange: {
        min: "",
        max: "",
      },
      applicationDeadline: "",
      description: "",
    },
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [joblist, setJoblist] = useState([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [job, setJob] = useState("");
  const { TextArea } = Input;
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleLocation = (value) => {
    console.log(value);
    setLocation(value);
  };

  const handleJob = (value) => {
    console.log(value);
    setJob(value);
  };

  const onChange = (value) => {
    console.log("onChange: ", value);
  };
  const onChangeComplete = (value) => {
    console.log("onChangeComplete: ", value);
  };

  const fetchData = async () => {
    await getAllJobs(search)
      .then((res) => {
        setJoblist(res.jobs);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  const onSubmit = async (values) => {
    const data = {
      ...values,
      salaryRange: {
        min: values.min,
        max: values.max,
      },
    };
    delete data.min;
    delete data.max;

    await insertJobs(data)
      .then((res) => {
        console.log(res.message);
        reset();
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <>
      <nav className="flex justify-center mt-5">
        <div className="flex justify-center items-center px-7 py-5 rounded-full bg-white shadow-[0_4px_20px_rgba(0,0,0,0.1)] gap-10">
          <div className="logo">
            <img src="./logo.jpg" className="w-10 h-10" />
          </div>
          <div className="flex gap-10 font-medium">
            <a>Home</a>
            <a>Find Jobs</a>
            <a>Find Talents</a>
            <a>About Us</a>
            <a>Testimonials</a>
          </div>
          <div className="button">
            <button
              className="bg-gradient-to-b from-[#a855f7] to-[#7e22ce] px-5 py-2 rounded-full text-white hover:cursor-pointer"
              onClick={showModal}
            >
              Create Jobs
            </button>
          </div>
        </div>
      </nav>

      <div className="shadow-lg shadow-gray-200 w-full h-25 gap-5 flex justify-center items-center px-20 mt-7 ">
        <Input
          placeholder="Search by Job Title, Role"
          variant="borderless"
          className="placeholder-gray-800 py-3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          prefix={<Search className="mr-5" />}
        />
        <Divider type="vertical" className="bg-gray-300 !h-[50%] " />

        <Select
          variant="borderless"
          className="!w-full"
          style={{ width: 120 }}
          onChange={handleLocation}
          prefix={<MapPin className="mr-5" />}
          placeholder="Preferred location"
          options={[
            { value: "Chennai" },
            { value: "Coimbatore" },
            { value: "Madurai" },
            { value: "Banglore" },
          ]}
        />

        <Divider type="vertical" className="bg-gray-300 !h-[50%] " />

        <Select
          defaultValue="Job Type"
          variant="borderless"
          className="!w-full"
          style={{ width: 120 }}
          onChange={handleJob}
          prefix={<UserRoundCog className="mr-5" />}
          options={[
            { value: "Full Time" },
            { value: "Part Time" },
            { value: "Internship" },
            { value: "Contract" },
          ]}
        />

        <Divider type="vertical" className="bg-gray-300 !h-[50%] " />

        <div className="!w-full px-5">
          <div className="flex justify-between font-bold">
            <p>Salary Per Month</p>
            <p>₹50K - ₹80K</p>
          </div>
          <Slider
            range
            defaultValue={[0, 80000]}
            className="[&_.ant-slider-track]:!bg-black [&_.ant-slider-handle]:!border-black"
            min={0}
            max={100000}
            onChange={onChange}
            onChangeComplete={onChangeComplete}
          />
        </div>
      </div>

      <div className="mt-10 px-20 grid grid-cols-4  gap-5">
        {joblist.map((job) => (
          <Card key={job._id} style={{ width: "100%" }} className="shadow-lg">
            <div className="flex flex-col gap-3">
              <div className="flex">
                <div className="w-20 h-20 shadow-lg bg-gradient-to-b from-[#fdfdfc] to-[#f2f2f2] rounded-2xl">
                  {/* logo */}
                </div>
              </div>
              <div>
                <p className="text-xl font-bold">{job.title}</p>
              </div>
              <div className="flex justify-between ">
                <p className="flex items-center gap-2">
                  <UserPlus size={(18, 18)} /> 1-3 yr Exp
                </p>

                <p className="flex items-center gap-2">
                  <Building2 size={(18, 18)} /> Onsite
                </p>

                <p className="flex items-center gap-2">
                  <Layers size={(15, 18)} /> 12LPA
                </p>
              </div>
              <div>
                <ul>
                  <li>{job.description}</li>
                </ul>
              </div>
              <div>
                <button className="!bg-[#00aaff] px-15 py-3 rounded-lg flex items-center gap-2 text-lg text-white hover:cursor-pointer w-full justify-center">
                  Apply Now
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        title={
          <div className="w-full text-center text-xl">Create Job Opening</div>
        }
        footer={""}
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2  gap-2 gap-y-3 grid-flow-row mt-10">
            <div className="">
              <p className="font-medium text-lg">Job Title</p>
              <Controller
                name="title"
                control={control}
                rules={{ required: "Job title is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Job Title"
                    className={`placeholder-gray-800 !py-3 hover:!border-black focus:!border-black 
        ${
          errors.title
            ? "!border-red-500 hover:!border-red-600 focus:!border-red-500"
            : ""
        }`}
                  />
                )}
              />
              {errors.title && (
                <p className="text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div className="">
              <p className="font-medium  text-lg">Company Name</p>
              <Controller
                name="companyName"
                control={control}
                rules={{ required: "Company name is required." }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Amazon, Microsoft, Swiggy"
                    variant="outlined"
                    className={`placeholder-gray-800 !py-3 hover:!border-black focus:!border-black 
        ${
          errors.companyName
            ? "!border-red-500 hover:!border-red-600 focus:!border-red-500"
            : ""
        }`}
                  />
                )}
              />
              {errors.companyName && (
                <p className="text-red-600">{errors.companyName.message}</p>
              )}
            </div>

            <div className="">
              <p className="font-medium  text-lg">Location</p>

              <Controller
                name="location"
                control={control}
                rules={{ required: "Location is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    variant="outlined"
                    placeholder="preferred location"
                    className={`!w-full selector [&_.ant-select-selector]:hover:!border-black 
    [&_.ant-select-selector]:focus:!border-black ${
      errors.location
        ? "[&_.ant-select-selector]:focus:!border-red-600 [&_.ant-select-selector]:hover:!border-red-600 [&_.ant-select-selector]:!border-red-600"
        : ""
    }`}
                    style={{
                      width: 120,
                      paddingTop: "8px",
                      paddingBottom: "8px",
                      height: "65px",
                    }}
                    options={[
                      { value: "Chennai" },
                      { value: "Coimbatore" },
                      { value: "Madurai" },
                      { value: "Banglore" },
                    ]}
                  />
                )}
              />
              {errors.location && (
                <p className="text-red-600">{errors.location.message}</p>
              )}
            </div>

            <div className="">
              <p className="font-medium  text-lg">Job type</p>
              <Controller
                name="jobType"
                control={control}
                rules={{ required: "Job type is required" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Job Type"
                    variant="outlined"
                    className={`!w-full selector [&_.ant-select-selector]:hover:!border-black 
    [&_.ant-select-selector]:focus:!border-black ${
      errors.jobType
        ? "[&_.ant-select-selector]:focus:!border-red-600 [&_.ant-select-selector]:hover:!border-red-600 [&_.ant-select-selector]:!border-red-600"
        : ""
    }`}
                    style={{
                      width: 120,
                      paddingTop: "8px",
                      paddingBottom: "8px",
                      height: "65px",
                    }}
                    options={[
                      { value: "Full Time" },
                      { value: "Part Time" },
                      { value: "Internship" },
                      { value: "Contract" },
                    ]}
                  />
                )}
              />

              {errors.jobType && (
                <p className="text-red-600">{errors.jobType.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <p className="font-medium col-span-2  text-lg">Salary Ranges</p>
              <div>
                <Controller
                  name="min"
                  control={control}
                  rules={{ required: "min range is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="₹0"
                      variant="outlined"
                      type="number"
                      prefix={
                        <ArrowUpDown
                          className="text-gray-300"
                          size={(15, 15)}
                        />
                      }
                      className={`placeholder-gray-800 !py-3 hover:!border-black focus:!border-black 
        ${
          errors.min
            ? "!border-red-500 hover:!border-red-600 focus:!border-red-500"
            : ""
        }`}
                    />
                  )}
                />
                {errors.min && (
                  <p className="text-red-600">{errors.min.message}</p>
                )}
              </div>
              <div>
                <Controller
                  name="max"
                  control={control}
                  rules={{ required: "max range is required" }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="₹12,00,000"
                      variant="outlined"
                      type="number"
                      prefix={
                        <ArrowUpDown
                          className="text-gray-300"
                          size={(15, 15)}
                        />
                      }
                      className={`placeholder-gray-800 !py-3 hover:!border-black focus:!border-black 
        ${
          errors.max
            ? "!border-red-500 hover:!border-red-600 focus:!border-red-500"
            : ""
        }`}
                    />
                  )}
                />
                {errors.max && (
                  <p className="text-red-600">{errors.max.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-y-2">
              <p className="font-medium  text-lg">Application Deadline</p>
              <div>
                <Controller
                  name="applicationDeadline"
                  rules={{ required: "deadline is required" }}
                  control={control}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      className={`w-full !py-3 hover:!border-black focus:!border-black ${
                        errors.applicationDeadline
                          ? "hover:!border-red-600 !border-red-600 focus:!border-red-600"
                          : ""
                      }`}
                      onChange={(date) => field.onChange(date)}
                    />
                  )}
                />
                {errors.applicationDeadline && (
                  <p className="text-red-600">
                    {errors.applicationDeadline.message}
                  </p>
                )}
              </div>
            </div>

            <div className="col-span-2 grid grid-y-2">
              <p className="font-medium  text-lg">Job Description</p>
              <Controller
                name="description"
                control={control}
                rules={{ required: "description is required" }}
                render={({ field }) => (
                  <TextArea
                    {...field}
                    className={`placeholder-gray-800 !py-3 hover:!border-black focus:!border-black 
        ${
          errors.description
            ? "hover:!border-red-500 !border-red-600 focus:!border-red-500"
            : ""
        }`}
                    rows={6}
                    placeholder="Please share the job description to let the candidate to know more about the job role"
                    maxLength={100}
                  />
                )}
              />
              {errors.description && (
                <p className="text-red-600">{errors.description.message}</p>
              )}
            </div>

            <div className="col-span-2 justify-between  grid grid-flow-col">
              <div>
                <button className=" px-15 py-3 rounded-lg flex items-center gap-2 text-lg outline-2 hover:cursor-pointer">
                  Save Draft <ChevronsDown />
                </button>
              </div>
              <div>
                <button
                  type="submit"
                  className="!bg-[#00aaff] px-15 py-3 rounded-lg flex items-center gap-2 text-lg text-white hover:cursor-pointer"
                >
                  Publish <ChevronsRight />
                </button>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default App;
