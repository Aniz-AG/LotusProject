import logo from './Images/logo.png'
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function Del (){
  const navbarStyle = {
    height: "60px",
    display: "flex",
    alignItems: "center",
  };
  const navigate = useNavigate();
  const back = () => {
    navigate("/imp");
  };

  const divStyle = {
    padding: '20px', // Optional: Adding padding for better visibility
  };
    return(
    <div>
          <div
        className="bg-custom-purple text-white sticky top-0"
        style={navbarStyle}
      >
        <button className="px-4" onClick={() => back()}>
          <BiArrowBack size={24} />
        </button>
        <div>
          <h1 className="text-white px-3">Delete</h1>
        </div>
      </div>
  
    <div className='sticky top-0 bg-white' style={divStyle}>
      <div className="flex justify-center items-center ">
        <img src={logo} alt="Center Image" className="w-40 h-40" />
      </div>
    </div>
    <div className='overflow-y-auto h-screen'>
<strong>Data Deletion Policy of Our App</strong><br/>
Last updated: 18 sep 2023<br/>
At GT Kalyan Milan Officials Matka App. we value your
privacy and are committed to providing you with control
over your personal data. This Data Deletion Policy
outlines our procedures and practices for deleting user
data collected through our apps available on the Google
Play Console.<br/><div className='mb-5'></div>

<strong>1. Data Deletion Requests </strong>
<div className='mb-5'></div>
Upon receiving a valid user data deletion request,
We will promptly take the Steps to delete
the specified data. Users can make data deletion
requests by contacting us through the following
methods: Through Email: To initiate a data deletion
request, users are advised to send an email to
ratankhatrisattamatkamumbai@gmail.corn, When
composing the email. please use •GT Kalyan Milan
Officials Matka App Data Delete Request • as the subject
line and provide all pertinent details in the message.<br/>
<div className='mb-5'></div>

<strong>2. Verification Of Data Deletion Requests </strong><br/>
<div className='mb-5'></div>
To protect the privacy and security of our users, we may
need to verify the identity of the individual making the
data deletion request. This verification process is crucial
to prevent unauthorized access to or deletion of user
data. <br/> 
<div className='mb-5'></div>

<strong>
3. Data Retention Period
</strong><br/>
<div className='mb-5'></div>
We retain user data only for as long as necessary to fulfill
the purposes for which it was collected and to comply
with legal obligations. Once the data is no longer needed,
We Will promptly delete it.<br/>
<div className='mb-5'></div>


<strong>
4. Types of Data Subject to Deletion
</strong>
<div className='mb-5'></div>
We will delete the following types of data upon receiving
a valid deletion request:
• Personal information, such as names and phone
numbers.
• Any other user data that is identifiable and can be linked
to an individual user.<br/>
<div className='mb-5'></div>

<strong>
5. Data Deletion Process
</strong>
<div className='mb-5'></div>
Upon receiving a valid data deletion request. we will
follow these steps:
• Verify the requestors identity if required.
• Identify and locate the requested data.
• Delete the specified data from our databases, servers.
and backup systems.
• Confirm the deletion of the data to the requestor, if
possible.<br/>
<div className='mb-5'></div>

<strong>
6. Exceptions
</strong>
<div className='mb-5'></div>
In certain circumstances, we may be unable to fulfill a
data deletion request. These circumstances may include:
• Legal obligations that require us to retain data
• Data necessary to resolve ongoing disputes or enforce
agreements.
• Data that is impractical to remove from our systems due
to technical constraints.<br/>
<div className='mb-5'></div>

<strong>
7. Understanding Data Usage through our Privacy Policy
</strong>
<div className='mb-5'></div>

We attach great importance to the privacy of our users
and remain fully committed to protecting their personal
information. To obtain a comprehensive understanding of
how we utilize user data and operate our app, we strongly
to Ily review privacy policy.
This policy elucidates the types of data we collect, our
utilization practices, and the parties with whom we may
share such data. Furthermore. it outlines the stringent
security measures we have implemented to ensure the
protection Of user informatl.on,
By acquainting themselves With our privacy policy,
users can rest assured that we handle their personal
information in a responsible and transparent manner.
Should any questions or concerns arise regarding
our policy or the utilization of personal data. we
wholeheartedly encourage users to contact us without
hesitation. We deeply value the trust our users place in us
and appreciate the opportunity to diligently serve them<br/>
<div className='mb-5'></div>

<strong>
8. Changes to this Data Deletion Policy
</strong>
<div className='mb-5'></div>

We may update this Data Deletion Policy periodically
to reflect changes in our data handling practices or
legal requirements, We encourage users to review this
policy regularly. Updates to this policy will be effective
immediately upon posting.<br/>
<div className='mb-5'></div>


<strong>Contact Us</strong>
<div className='mb-5'></div>

If you have any questions or concerns about
our Data Deletion policy or would like to make
a data deletion request. please contact us at
Thank you
for trusting GT Kalyan Milan Officials Matka App with
r data privacy concerns.  <br/>
<div className='mb-5'></div>
        
        
        
        
     
    </div>
  </div>
    );
}
export default Del;