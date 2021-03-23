import java.time.Year;
import java.util.ArrayList;
import java.util.Date;

public class Project {
    public static void main(String[] args) {
    }
}

class App {
    private ArrayList<Company> companies;

    public App(ArrayList<Company> companies) {
        this.companies = companies;
    }

    public ArrayList<Company> getCompanies() {
        return companies;
    }

    public void setCompanies(ArrayList<Company> companies) {
        this.companies = companies;
    }
}

class Company {
    private ArrayList<Employee> employees;
    private ArrayList<Department> departments;
    private ArrayList<Payroll>  payrolls;
    private int maximumPersonalLeaves;
    private int maximumSickLeaves;
    private ArrayList<LeaveRequest> leaveRequests;

    public Company(ArrayList<Employee> employees,
                   ArrayList<Department> departments,
                   ArrayList<Payroll> payrolls,
                   int maximumPersonalLeaves,
                   int maximumSickLeaves,
                   ArrayList<LeaveRequest> leaveRequests) {
        this.employees = employees;
        this.departments = departments;
        this.payrolls = payrolls;
        this.maximumPersonalLeaves = maximumPersonalLeaves;
        this.maximumSickLeaves = maximumSickLeaves;
        this.leaveRequests = leaveRequests;
    }

    public ArrayList<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(ArrayList<Employee> employees) {
        this.employees = employees;
    }

    public ArrayList<Department> getDepartments() {
        return departments;
    }

    public void setDepartments(ArrayList<Department> departments) {
        this.departments = departments;
    }

    public ArrayList<Payroll> getPayrolls() {
        return payrolls;
    }

    public void setPayrolls(ArrayList<Payroll> payrolls) {
        this.payrolls = payrolls;
    }

    public int getMaximumPersonalLeaves() {
        return maximumPersonalLeaves;
    }

    public void setMaximumPersonalLeaves(int maximumPersonalLeaves) {
        this.maximumPersonalLeaves = maximumPersonalLeaves;
    }

    public int getMaximumSickLeaves() {
        return maximumSickLeaves;
    }

    public void setMaximumSickLeaves(int maximumSickLeaves) {
        this.maximumSickLeaves = maximumSickLeaves;
    }

    public ArrayList<LeaveRequest> getLeaveRequests() {
        return leaveRequests;
    }

    public void setLeaveRequests(ArrayList<LeaveRequest> leaveRequests) {
        this.leaveRequests = leaveRequests;
    }
}

class Payroll {
    private Date startingDate;
    private Date endingDate;
    private ArrayList<Wages> wages;

    public Payroll(Date startingDate, Date endingDate, ArrayList<Wages> wages) {
        this.startingDate = startingDate;
        this.endingDate = endingDate;
        this.wages = wages;
    }

    public Date getStartingDate() {
        return startingDate;
    }

    public void setStartingDate(Date startingDate) {
        this.startingDate = startingDate;
    }

    public Date getEndingDate() {
        return endingDate;
    }

    public void setEndingDate(Date endingDate) {
        this.endingDate = endingDate;
    }

    public ArrayList<Wages> getWages() {
        return wages;
    }

    public void setWages(ArrayList<Wages> wages) {
        this.wages = wages;
    }
}

enum PaymentMethod {
    BANK_TRANSFER,
    CHECK
}

enum PaymentStatus {
    PENDING,
    COMPLETE
}

class Wages {
    private String employeeIDNumber;
    private final int[] hoursWorkedEachDay = new int[14];
    private int rateOfPay;
    private int grossAmountEarned;
    private int totalDeductions;
    private int netWagesPaidForWeek;
    private PaymentMethod paymentMethod;
    private PaymentStatus paymentStatus;

    public Wages(String employeeIDNumber,
                 int rateOfPay,
                 int grossAmountEarned,
                 int totalDeductions,
                 int netWagesPaidForWeek,
                 PaymentMethod paymentMethod,
                 PaymentStatus paymentStatus) {
        this.employeeIDNumber = employeeIDNumber;
        this.rateOfPay = rateOfPay;
        this.grossAmountEarned = grossAmountEarned;
        this.totalDeductions = totalDeductions;
        this.netWagesPaidForWeek = netWagesPaidForWeek;
        this.paymentMethod = paymentMethod;
        this.paymentStatus = paymentStatus;
    }

    public String getEmployeeIDNumber() {
        return employeeIDNumber;
    }

    public void setEmployeeIDNumber(String employeeIDNumber) {
        this.employeeIDNumber = employeeIDNumber;
    }

    public int[] getHoursWorkedEachDay() {
        return hoursWorkedEachDay;
    }

    public int getRateOfPay() {
        return rateOfPay;
    }

    public void setRateOfPay(int rateOfPay) {
        this.rateOfPay = rateOfPay;
    }

    public int getGrossAmountEarned() {
        return grossAmountEarned;
    }

    public void setGrossAmountEarned(int grossAmountEarned) {
        this.grossAmountEarned = grossAmountEarned;
    }

    public int getTotalDeductions() {
        return totalDeductions;
    }

    public void setTotalDeductions(int totalDeductions) {
        this.totalDeductions = totalDeductions;
    }

    public int getNetWagesPaidForWeek() {
        return netWagesPaidForWeek;
    }

    public void setNetWagesPaidForWeek(int netWagesPaidForWeek) {
        this.netWagesPaidForWeek = netWagesPaidForWeek;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public PaymentStatus getPaymentStatus() {
        return paymentStatus;
    }

    public void setPaymentStatus(PaymentStatus paymentStatus) {
        this.paymentStatus = paymentStatus;
    }
}

class Department {
    private String departmentIDNumber;
    private String title;
    private String headIDNumber;
    private ArrayList<String> memberIDNumbers;

    public Department(String departmentIDNumber,
                      String title,
                      String headIDNumber,
                      ArrayList<String> memberIDNumbers) {
        this.departmentIDNumber = departmentIDNumber;
        this.title = title;
        this.headIDNumber = headIDNumber;
        this.memberIDNumbers = memberIDNumbers;
    }

    public String getDepartmentIDNumber() {
        return departmentIDNumber;
    }

    public void setDepartmentIDNumber(String departmentIDNumber) {
        this.departmentIDNumber = departmentIDNumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getHeadIDNumber() {
        return headIDNumber;
    }

    public void setHeadIDNumber(String headIDNumber) {
        this.headIDNumber = headIDNumber;
    }

    public ArrayList<String> getMemberIDNumbers() {
        return memberIDNumbers;
    }

    public void setMemberIDNumbers(ArrayList<String> memberIDNumbers) {
        this.memberIDNumbers = memberIDNumbers;
    }
}

class Skill {
    private String skill;
    private int percentage;

    public Skill(String skill, int percentage) {
        this.skill = skill;
        this.percentage = percentage;
    }

    public String getSkill() {
        return skill;
    }

    public void setSkill(String skill) {
        this.skill = skill;
    }

    public int getPercentage() {
        return percentage;
    }

    public void setPercentage(int percentage) {
        this.percentage = percentage;
    }
}

class Employee extends User {
    private String employeeIDNumber;
    private String title;
    private String employmentType;
    private String departmentIDNumber;
    private Date beginDate;
    private Address address;
    private ArrayList<Education> educations;
    private ArrayList<WorkExperience> workExperiences;
    private ArrayList<Skill> skills;
    private int socialSecurityNumber;
    private LeaveBenefits leaveBenefits;
    private boolean isCompanyAdmin;
    private boolean isDepartmentHead;

    public Employee(UserCredentials userCredentials,
                    String firstName,
                    String lastName,
                    String emailAddress,
                    Date dateOfBirth,
                    String gender,
                    String pronoun,
                    String employeeIDNumber,
                    String title,
                    String employmentType,
                    String departmentIDNumber,
                    Date beginDate,
                    Address address,
                    ArrayList<Education> educations,
                    ArrayList<WorkExperience> workExperiences,
                    ArrayList<Skill> skills,
                    int socialSecurityNumber,
                    LeaveBenefits leaveBenefits,
                    boolean isCompanyAdmin,
                    boolean isDepartmentHead) {
        super(userCredentials, firstName, lastName, emailAddress, dateOfBirth, gender, pronoun);
        this.employeeIDNumber = employeeIDNumber;
        this.title = title;
        this.employmentType = employmentType;
        this.departmentIDNumber = departmentIDNumber;
        this.beginDate = beginDate;
        this.address = address;
        this.educations = educations;
        this.workExperiences = workExperiences;
        this.skills = skills;
        this.socialSecurityNumber = socialSecurityNumber;
        this.leaveBenefits = leaveBenefits;
        this.isCompanyAdmin = isCompanyAdmin;
        this.isDepartmentHead = isDepartmentHead;
    }

    public String getEmployeeIDNumber() {
        return employeeIDNumber;
    }

    public void setEmployeeIDNumber(String employeeIDNumber) {
        this.employeeIDNumber = employeeIDNumber;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getEmploymentType() {
        return employmentType;
    }

    public void setEmploymentType(String employmentType) {
        this.employmentType = employmentType;
    }

    public String getDepartmentIDNumber() {
        return departmentIDNumber;
    }

    public void setDepartmentIDNumber(String departmentIDNumber) {
        this.departmentIDNumber = departmentIDNumber;
    }

    public Date getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(Date beginDate) {
        this.beginDate = beginDate;
    }

    public Address getAddress() {
        return address;
    }

    public void setAddress(Address address) {
        this.address = address;
    }

    public ArrayList<Education> getEducations() {
        return educations;
    }

    public void setEducations(ArrayList<Education> educations) {
        this.educations = educations;
    }

    public ArrayList<WorkExperience> getWorkExperiences() {
        return workExperiences;
    }

    public void setWorkExperiences(ArrayList<WorkExperience> workExperiences) {
        this.workExperiences = workExperiences;
    }

    public ArrayList<Skill> getSkills() {
        return skills;
    }

    public void setSkills(ArrayList<Skill> skills) {
        this.skills = skills;
    }

    public int getSocialSecurityNumber() {
        return socialSecurityNumber;
    }

    public void setSocialSecurityNumber(int socialSecurityNumber) {
        this.socialSecurityNumber = socialSecurityNumber;
    }

    public LeaveBenefits getLeaveBenefits() {
        return leaveBenefits;
    }

    public void setLeaveBenefits(LeaveBenefits leaveBenefits) {
        this.leaveBenefits = leaveBenefits;
    }

    public boolean isCompanyAdmin() {
        return isCompanyAdmin;
    }

    public void setCompanyAdmin(boolean companyAdmin) {
        isCompanyAdmin = companyAdmin;
    }

    public boolean isDepartmentHead() {
        return isDepartmentHead;
    }

    public void setDepartmentHead(boolean departmentHead) {
        isDepartmentHead = departmentHead;
    }
}

enum LeaveBenefitType {
    PERSONAL_LEAVE,
    SICK_LEAVE
}

enum LeaveRequestStatus {
    PENDING,
    APPROVED,
    DENIED
}

class LeaveRequest {
    private String employeeIDNumber;
    private LeaveBenefitType leaveBenefitType;
    private LeaveRequestStatus leaveRequestStatus;
    private Date startingDate;
    private Date endingDate;
    private boolean isPaidLeave;

    public LeaveRequest(String employeeIDNumber,
                        LeaveBenefitType leaveBenefitType,
                        LeaveRequestStatus leaveRequestStatus,
                        Date startingDate,
                        Date endingDate,
                        boolean isPaidLeave) {
        this.employeeIDNumber = employeeIDNumber;
        this.leaveBenefitType = leaveBenefitType;
        this.leaveRequestStatus = leaveRequestStatus;
        this.startingDate = startingDate;
        this.endingDate = endingDate;
        this.isPaidLeave = isPaidLeave;
    }

    public String getEmployeeIDNumber() {
        return employeeIDNumber;
    }

    public void setEmployeeIDNumber(String employeeIDNumber) {
        this.employeeIDNumber = employeeIDNumber;
    }

    public LeaveBenefitType getLeaveBenefitType() {
        return leaveBenefitType;
    }

    public void setLeaveBenefitType(LeaveBenefitType leaveBenefitType) {
        this.leaveBenefitType = leaveBenefitType;
    }

    public LeaveRequestStatus getLeaveRequestStatus() {
        return leaveRequestStatus;
    }

    public void setLeaveRequestStatus(LeaveRequestStatus leaveRequestStatus) {
        this.leaveRequestStatus = leaveRequestStatus;
    }

    public Date getStartingDate() {
        return startingDate;
    }

    public void setStartingDate(Date startingDate) {
        this.startingDate = startingDate;
    }

    public Date getEndingDate() {
        return endingDate;
    }

    public void setEndingDate(Date endingDate) {
        this.endingDate = endingDate;
    }

    public boolean isPaidLeave() {
        return isPaidLeave;
    }

    public void setPaidLeave(boolean paidLeave) {
        isPaidLeave = paidLeave;
    }
}

class LeaveBenefits {
    int personalLeaves;
    int sickLeaves;

    public LeaveBenefits(int personalLeaves, int sickLeaves) {
        this.personalLeaves = personalLeaves;
        this.sickLeaves = sickLeaves;
    }

    public int getPersonalLeaves() {
        return personalLeaves;
    }

    public void setPersonalLeaves(int personalLeaves) {
        this.personalLeaves = personalLeaves;
    }

    public int getSickLeaves() {
        return sickLeaves;
    }

    public void setSickLeaves(int sickLeaves) {
        this.sickLeaves = sickLeaves;
    }
}

class Address {
    private String address1;
    private String address2;
    private String city;
    private String region;
    private int postalCode;
    private int telephoneNumber;

    public Address(String address1, String address2, String city, String region, int postalCode, int telephoneNumber) {
        this.address1 = address1;
        this.address2 = address2;
        this.city = city;
        this.region = region;
        this.postalCode = postalCode;
        this.telephoneNumber = telephoneNumber;
    }

    public String getAddress1() {
        return address1;
    }

    public void setAddress1(String address1) {
        this.address1 = address1;
    }

    public String getAddress2() {
        return address2;
    }

    public void setAddress2(String address2) {
        this.address2 = address2;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public int getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(int postalCode) {
        this.postalCode = postalCode;
    }

    public int getTelephoneNumber() {
        return telephoneNumber;
    }

    public void setTelephoneNumber(int telephoneNumber) {
        this.telephoneNumber = telephoneNumber;
    }
}

class Education {
    private String school;
    private String degree;
    private String fieldOfStudy;
    private Year startYear;
    private Year endYear;

    public Education(String school, String degree, String fieldOfStudy, Year startYear, Year endYear) {
        this.school = school;
        this.degree = degree;
        this.fieldOfStudy = fieldOfStudy;
        this.startYear = startYear;
        this.endYear = endYear;
    }

    public String getSchool() {
        return school;
    }

    public void setSchool(String school) {
        this.school = school;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getFieldOfStudy() {
        return fieldOfStudy;
    }

    public void setFieldOfStudy(String fieldOfStudy) {
        this.fieldOfStudy = fieldOfStudy;
    }

    public Year getStartYear() {
        return startYear;
    }

    public void setStartYear(Year startYear) {
        this.startYear = startYear;
    }

    public Year getEndYear() {
        return endYear;
    }

    public void setEndYear(Year endYear) {
        this.endYear = endYear;
    }
}

enum EmploymentType {
    FULL_TIME,
    PART_TIME,
    SELF_EMPLOYED,
    FREELANCE,
    CONTRACT,
    INTERNSHIP,
    APPRENTICESHIP,
    SEASONAL
}

class WorkExperience {
    private String title;
    private EmploymentType employmentType;
    private String company;
    private String location;
    private Date startDate;
    private Date endDate;

    public WorkExperience(String title,
                          EmploymentType employmentType,
                          String company,
                          String location,
                          Date startDate,
                          Date endDate) {
        this.title = title;
        this.employmentType = employmentType;
        this.company = company;
        this.location = location;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public EmploymentType getEmploymentType() {
        return employmentType;
    }

    public void setEmploymentType(EmploymentType employmentType) {
        this.employmentType = employmentType;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
}

class User {
    private UserCredentials userCredentials;
    private String firstName;
    private String lastName;
    private String emailAddress;
    private Date dateOfBirth;
    private String gender;
    private String pronoun;

    public User(UserCredentials userCredentials,
                String firstName,
                String lastName,
                String emailAddress,
                Date dateOfBirth,
                String gender,
                String pronoun) {
        this.userCredentials = userCredentials;
        this.firstName = firstName;
        this.lastName = lastName;
        this.emailAddress = emailAddress;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.pronoun = pronoun;
    }

    public UserCredentials getUserCredentials() {
        return userCredentials;
    }

    public void setUserCredentials(UserCredentials userCredentials) {
        this.userCredentials = userCredentials;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public Date getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(Date dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getPronoun() {
        return pronoun;
    }

    public void setPronoun(String pronoun) {
        this.pronoun = pronoun;
    }
}

class UserCredentials {
    private String username;
    private String password;
    private int userIDNumber;

    public UserCredentials(String username, String password, int userIDNumber) {
        this.username = username;
        this.password = password;
        this.userIDNumber = userIDNumber;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getUserIDNumber() {
        return userIDNumber;
    }

    public void setUserIDNumber(int userIDNumber) {
        this.userIDNumber = userIDNumber;
    }
}