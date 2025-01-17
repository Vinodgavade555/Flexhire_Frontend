import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';

const Data = [
  {
    id: 1,
    company_name: 'Tech Innovations',
    about:
      'Tech Innovations is a leading software development company specializing in creating cutting-edge technology solutions.',
    logo: 'https://www.techinnovations.com/logo.png',
    recruiter_name: 'John Doe',
    contact_email: 'john.doe@techinnovations.com',
    phone: '+1234567890',
    location: 'San Francisco, CA',
    industry: 'Information Technology',
    posted_jobs: [
      {
        job_title: 'Software Engineer',
        job_description:
          'Develop high-quality software solutions by collaborating with cross-functional teams. Participate in code reviews, debugging, and performance tuning to optimize applications. Stay updated with emerging technologies to ensure the implementation of best practices. Contribute to architecture discussions and design processes. Ensure the integrity of the codebase by adhering to coding standards.',
        experience_required: '3-5 years',
        salary_range: '$80,000 - $100,000',
        required_skills: ['JavaScript', 'React', 'Node.js', 'SQL'],
        positions_available: 3,
        job_type: 'Onsite',
      },
    ],
    website: 'https://www.techinnovations.com',
  },
  {
    id: 2,
    company_name: 'Creative Solutions',
    about:
      "Creative Solutions provides innovative design and digital marketing strategies tailored to clients' needs.",
    logo: 'https://www.creativesolutions.com/logo.png',
    recruiter_name: 'Jane Smith',
    contact_email: 'jane.smith@creativesolutions.com',
    phone: '+1987654321',
    location: 'New York, NY',
    industry: 'Marketing',
    posted_jobs: [
      {
        job_title: 'Digital Marketing Specialist',
        job_description:
          'Design and implement comprehensive digital marketing strategies to enhance online presence. Analyze marketing data to derive insights for improvement. Collaborate with the design team to create engaging content across platforms. Conduct market research to identify new trends and target audiences. Manage social media accounts and campaigns to drive brand engagement.',
        experience_required: '2-4 years',
        salary_range: '$60,000 - $80,000',
        required_skills: [
          'SEO',
          'Content Marketing',
          'Social Media Management',
        ],
        positions_available: 5,
        job_type: 'Hybrid',
      },
    ],
    website: 'https://www.creativesolutions.com',
  },
  {
    id: 3,
    company_name: 'HealthTech Solutions',
    about:
      'HealthTech Solutions aims to revolutionize the healthcare industry through innovative software applications.',
    logo: 'https://www.healthtechsolutions.com/logo.png',
    recruiter_name: 'Michael Brown',
    contact_email: 'michael.brown@healthtechsolutions.com',
    phone: '+1122334455',
    location: 'Chicago, IL',
    industry: 'Healthcare',
    posted_jobs: [
      {
        job_title: 'Health Data Analyst',
        job_description:
          'Analyze healthcare data to provide actionable insights for improving patient outcomes. Collaborate with medical professionals to understand data needs and develop analytical solutions. Create reports and visualizations to present findings to stakeholders. Ensure data integrity by implementing quality control measures. Stay informed about industry trends to align analytics strategies.',
        experience_required: '2-3 years',
        salary_range: '$70,000 - $90,000',
        required_skills: ['Data Analysis', 'Excel', 'SQL'],
        positions_available: 2,
        job_type: 'Remote',
      },
    ],
    website: 'https://www.healthtechsolutions.com',
  },
  {
    id: 4,
    company_name: 'EcoFriendly Products',
    about:
      'EcoFriendly Products is dedicated to providing sustainable solutions for everyday needs.',
    logo: 'https://www.ecofriendlyproducts.com/logo.png',
    recruiter_name: 'Linda Green',
    contact_email: 'linda.green@ecofriendlyproducts.com',
    phone: '+2233445566',
    location: 'Austin, TX',
    industry: 'E-commerce',
    posted_jobs: [
      {
        job_title: 'E-commerce Manager',
        job_description:
          "Oversee the online store's operations, ensuring a seamless customer experience. Develop and implement marketing strategies to drive traffic and sales. Analyze website performance metrics to identify areas for improvement. Collaborate with product teams to manage inventory and pricing. Manage customer service interactions to enhance customer satisfaction.",
        experience_required: '4-6 years',
        salary_range: '$80,000 - $100,000',
        required_skills: [
          'E-commerce Platforms',
          'Digital Marketing',
          'Analytics',
        ],
        positions_available: 1,
        job_type: 'Onsite',
      },
    ],
    website: 'https://www.ecofriendlyproducts.com',
  },
  {
    id: 5,
    company_name: 'Smart Home Solutions',
    about:
      'Smart Home Solutions focuses on creating integrated technology for home automation.',
    logo: 'https://www.smarthomesolutions.com/logo.png',
    recruiter_name: 'David White',
    contact_email: 'david.white@smarthomesolutions.com',
    phone: '+3344556677',
    location: 'Los Angeles, CA',
    industry: 'Technology',
    posted_jobs: [
      {
        job_title: 'IoT Developer',
        job_description:
          'Develop and implement Internet of Things (IoT) applications and solutions. Work on integrating various hardware components with cloud services. Collaborate with cross-functional teams to define project requirements and specifications. Test and debug systems to ensure functionality and reliability. Stay updated on emerging technologies and industry trends.',
        experience_required: '3-5 years',
        salary_range: '$90,000 - $110,000',
        required_skills: ['IoT', 'Embedded Systems', 'Python'],
        positions_available: 4,
        job_type: 'Remote',
      },
    ],
    website: 'https://www.smarthomesolutions.com',
  },
];
const JobbasedonProfile = () => {
  const renderItem = ({item, index}) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.headingContainer}>
        <Image
          style={styles.itemLogo}
          source={require('../Assets/Logo/TCS_logo.png')}
        />
        <View style={styles.companyContainer}>
          <Text style={styles.companyName}>{item.company_name}</Text>
          {item.posted_jobs.map((job, jobIndex) => (
            <View key={job.job_title} style={styles.jobContainer}>
              <Text style={styles.jobTitleText}>{job.job_title}</Text>
              <Text style={styles.experienceText}>
                {job.experience_required}
              </Text>
              <Text style={styles.companyLocation}>{item.location}</Text>
              {/* <View style={styles.skillsTextContainer}>
            {job.required_skills.map((skill, skillIndex) => (
              <Text key={skillIndex} style={styles.skill}>
                {skill}
              </Text>
            ))}
          </View> */}
            </View>
          ))}
          {/* <Text style={styles.companyLocation}>{item.location}</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.MainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          Job based on your Profile ({Data.length})
        </Text>
        <Text style={styles.viewAll}>View All</Text>
      </View>
      {/* {isLoading ? ( // Optional loading indicator
        <ActivityIndicator size="large" color="#0000ff" />
      ) : ( */}
      <FlatList
        data={Data.slice(0, 5)} // Showing the first 5 jobs
        keyExtractor={item => item.id.toString()} // Use a proper keyExtractor
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
        renderItem={renderItem}
      />
      {/* )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  MainContainer: {
    marginBottom: 18,
  },
  companyLocation: {
    color: '#d9d9d9',
  },
  flatListContent: {},
  companyContainer: {
    flexDirection: 'column',
    marginHorizontal: 14,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginRight: 12,
    marginVertical: 12,
  },
  title: {
    maxWidth: 200,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  viewAll: {
    fontSize: 15,
    color: '#80d4ff',
    fontWeight: 'bold',
  },
  itemText: {
    color: '#333',
  },
  itemLogo: {
    padding: 10,
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  headingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  companyName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginRight: 14,
    maxWidth: 300,
    maxHeight: 250,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    backgroundColor: '#004466',
  },
  // jobContainer: {
  //   marginVertical: 8,
  // },
  jobTitleText: {
    color: '#d9d9d9',
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 0,
  },
  experienceText: {
    color: '#d9d9d9',
    fontSize: 14,
  },
  skillsTextContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    backgroundColor: '#e6f7ff',
    color: '#333',
    marginHorizontal: 4,
    fontSize: 14,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 8,
    marginTop: 10,
  },
});

export default JobbasedonProfile;
