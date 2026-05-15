
import React, { useEffect, useState } from 'react'
import AxiosInstance from './Axios'
import { Box, Typography } from '@mui/material'
import AddBoxIcon from '@mui/icons-material/AddBox';
import Button from '@mui/material/Button';
import TextForm from './form/TextForm';
import SelectForm from './form/SelectForm';
import MultipleSelectForm from './form/MutliSelectForm';
import DescriptionForm from './form/DescriptionForm';
import MyMessage from './form/Message';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { useNavigate,useParams } from 'react-router-dom'

const Edit = () => {
  const MyParameter=useParams()
  const myId=MyParameter.id
  console.log("MyId:",myId)
  
  const [country, setCountry] = useState([])
  const [league, setLeague] = useState([])
  const [characteristic, setCharacteristic] = useState([])
  
  // ✅ Store data, not JSX
  const [message, setMessage] = useState({ text: null, color: null })
  const [myData, setMyData] = useState(
    {
      name:'',
      description: '',
      country: '',
      league: '',
      attendance:0,
      city: '',
      characteristic: [],
    }
  )
  console.log("MyData:",myData)
  const navigate = useNavigate()



    


  

  const GetData = () => {
    AxiosInstance.get(`country/`).then((res) => { setCountry(res.data) })
    AxiosInstance.get(`league/`).then((res) => { setLeague(res.data) })
    AxiosInstance.get(`characteristic/`).then((res) => { setCharacteristic(res.data) })
    AxiosInstance.get(`footballclub/${myId}`).then((res) => {
            setMyData(res.data)
        })
  }

  useEffect(() =>{
     GetData()

     }, [])

  const validationSchema = yup.object({
    name: yup.string("The name must be text").required("Club name is required"),
    description: yup.string("Description must be text").required("Description is required"),
    attendance: yup.number("Attendance must be a number").required("Attendance is required"),
    characteristic: yup.array().min(1, "At least one characteristic must be selected")
  })

  const formik = useFormik({
    initialValues: {
      name: myData.name || '',
      description:myData.description,
      country: myData.country || '',
      league: myData.league || '',
      attendance: myData.attendance || 0,
      city: myData.city || '',
      characteristic: myData.characteristic,
    },
    enableReinitialize: true, // ✅ Important for editing existing data
    validationSchema: validationSchema,
    onSubmit: (values) => {

      AxiosInstance.put(`footballclub/${myId}/`, values)
        .then((res) => {
          console.log("SUCCESS", res.data)

          // ✅ Set message BEFORE resetForm to avoid any state race
          setMessage({ text: "You successfully updated the database!", color: "green" })

          formik.resetForm()

          setTimeout(() => {
            navigate('/')
          }, 2000)
        })
        .catch((err) => {
          console.log("ERROR", err.response?.data)

          // ✅ Now error message also works properly
          setMessage({ text: "Submission failed!", color: "red" })
        })
    }
  })

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>

        <Box className={"TopBar"}>
          <AddBoxIcon />
          <Typography sx={{ marginLeft: '15px', fontWeight: 'bold' }} variant='subtitle1'>
            Edit Football club information!
          </Typography>
        </Box>

        {/* ✅ Render component with data props, not JSX from state */}
        <MyMessage messageText={message.text} messageColor={message.color} />

        <Box className={"FormBox"}>

          <Box className={"FormArea"}>
            <TextForm
              label={"Club Name"} name='name'
              value={formik.values.name} onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <Box sx={{ marginTop: '30px' }}>
              <TextForm
                label={"City"} name='city'
                value={formik.values.city} onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </Box>
            <Box sx={{ marginTop: '30px' }}>
              <SelectForm
                label={"League"} options={league} name='league'
                value={formik.values.league} onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.league && Boolean(formik.errors.league)}
                helperText={formik.touched.league && formik.errors.league}
              />
            </Box>
            <Box sx={{ marginTop: '30px' }}>
              <Button type="submit" variant="contained" fullWidth>
                Submit the Data
              </Button>
            </Box>
          </Box>

          <Box className={"FormArea"}>
            <SelectForm
              label={"Country"} options={country} name='country'
              value={formik.values.country} onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.country && Boolean(formik.errors.country)}
              helperText={formik.touched.country && formik.errors.country}
            />
            <Box sx={{ marginTop: '30px' }}>
              <TextForm
                label={"Attendance"} name='attendance'
                value={formik.values.attendance} onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.attendance && Boolean(formik.errors.attendance)}
                helperText={formik.touched.attendance && formik.errors.attendance}
              />
            </Box>
            <Box sx={{ marginTop: '30px' }}>
              <MultipleSelectForm
                label={"Characteristics"} options={characteristic} name='characteristic'
                value={formik.values.characteristic} onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.characteristic && Boolean(formik.errors.characteristic)}
                helperText={formik.touched.characteristic && formik.errors.characteristic}
              />
            </Box>
          </Box>

          <Box className={"FormArea"}>
            <DescriptionForm
              label={"Description"} rows={9} name='description'
              value={formik.values.description} onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={formik.touched.description && formik.errors.description}
            />
          </Box>

        </Box>
      </form>
    </div>
  )
}

export default Edit