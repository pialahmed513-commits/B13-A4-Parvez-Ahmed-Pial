let InterviewList = [];
let RejectedList = [];
let currentStatus ="all"


let total = document.getElementById("total")
let Interview = document.getElementById("InterviewCount")
let Rejected = document.getElementById("RejectedCount")


const AllFilterBtn =document.getElementById("All-filter-btn")
const InterviewFilterBtn = document.getElementById("Interview-filter-btn")
const RejectedFilterBtn = document.getElementById("Rejected-filter-btn")


const availableCount = document.getElementById("availableCount")
const AllCardSection = document.getElementById("AllCards");
const mainContainer = document.querySelector('main');
const filterCardSection =document.getElementById("filter-card-section")
// console.log(mainContainer);

//  CalculateCount :

function CalculateCount () {
    total.innerText = AllCardSection.children.length;
    Interview.innerText = InterviewList.length;
    Rejected.innerText = RejectedList.length;

    if (currentStatus === "All-filter-btn") {
        availableCount.innerText = AllCardSection.children.length + " : jobs";
        
    }else if (currentStatus === "Interview-filter-btn") {
        availableCount.innerText = InterviewList.length + " : jobs";
        
    }
    else if (currentStatus === "Rejected-filter-btn") {
        availableCount.innerText = RejectedList.length + " : jobs";
        
    }
    
}
CalculateCount()

//  toggleStyle :

function toggleStyle(id){
    
    AllFilterBtn.classList.add('bg-gray-300', 'text-black')
    InterviewFilterBtn.classList.add('bg-gray-300', 'text-black')
    RejectedFilterBtn.classList.add('bg-gray-300', 'text-black')

    AllFilterBtn.classList.remove('bg-blue-600', 'text-white')
    InterviewFilterBtn.classList.remove('bg-blue-600', 'text-white')
    RejectedFilterBtn.classList.remove('bg-blue-600', 'text-white')

    console.log(id);

    const selected = document.getElementById(id)
    currentStatus = id
    // console.log(selected);

    selected.classList.remove('bg-gray-300', 'text-black')
    selected.classList.add('bg-blue-600', 'text-white')

    if (id == "Interview-filter-btn") {
        AllCardSection.classList.add("hidden");
        filterCardSection.classList.remove("hidden")
         rendarInterview();
        
    }else if( id == "All-filter-btn"){
        AllCardSection.classList.remove("hidden");
        filterCardSection.classList.add("hidden");
        
    }else if (id == "Rejected-filter-btn") {
        AllCardSection.classList.add("hidden");
        filterCardSection.classList.remove("hidden")
        rendarReject();
    }

  CalculateCount ()
}
    // delegation style :

mainContainer.addEventListener("click",function(event){

    if (event.target.classList.contains("interview-btn")) {
        
    const parentNode = event.target.parentNode.parentNode
    const companyName = parentNode.querySelector(".companyName").innerText
    const position = parentNode.querySelector(".position").innerText
    const salary = parentNode.querySelector(".salary").innerText
    const notes = parentNode.querySelector(".notes").innerText

    parentNode.querySelector(".status").innerText ="interview"
    
    const cardInfo ={
      companyName,
      position,
      salary,
      status:"interview",
      notes
    }
    const companyNameExist = InterviewList.find(item =>item.companyName === cardInfo.companyName)
    
    if (!companyNameExist) {
        InterviewList.push(cardInfo)

      RejectedList = RejectedList.filter(item =>item.companyName !== companyName)

    }
  
    CalculateCount()
    rendarInterview()
    }

    else if (event.target.classList.contains("Rejected-btn")) {
        

    const parentNode = event.target.parentNode.parentNode
    const companyName = parentNode.querySelector(".companyName").innerText
    const position = parentNode.querySelector(".position").innerText
    const salary = parentNode.querySelector(".salary").innerText
    const notes = parentNode.querySelector(".notes").innerText

    parentNode.querySelector(".status").innerText ="Rejected"
    
    const cardInfo ={
      companyName,
      position,
      salary,
      status:"Rejected",
      notes
    }
   const companyNameExist = RejectedList.find(item => item.companyName === cardInfo.companyName)
    

    if (!companyNameExist) {
        RejectedList.push(cardInfo)

    InterviewList = InterviewList.filter(item =>item.companyName !== companyName)
    

    }
   
    CalculateCount()
     rendarReject()

     }
   
else if (event.target.closest(".delete")) {

    const card = event.target.closest(".card");
    const companyName = card.querySelector(".companyName").innerText;

    InterviewList = InterviewList.filter(item => item.companyName !== companyName);
    RejectedList = RejectedList.filter(item => item.companyName !== companyName);

    card.remove();

    CalculateCount();

    if(currentStatus === "Interview-filter-btn"){
        rendarInterview();
    }
    else if(currentStatus === "Rejected-filter-btn"){
        rendarReject();
    }
}

    
})
     // No jobs Available logo section:
     
function showEmptyState(message) {
    filterCardSection.innerHTML = `
        <div class="flex flex-col items-center justify-center py-16 space-y-4">
            <i class="fa-solid fa-file-fragment text-6xl text-gray-400"></i>
            <h2 class="text-xl font-semibold">${message}</h2>
            <p class="text-gray-500">You haven't added any jobs yet.</p>
        </div>
    `;
}

// Render starts :

function rendarInterview () {
    filterCardSection.innerHTML = ""

    if (InterviewList.length === 0) {
        showEmptyState("No jobs Available");
        return;
    }


    for( let interview of InterviewList){
        console.log(interview);
        let div = document.createElement("div")
        div.className ="card flex justify-between rounded-2xl p-5 bg-[#EEF4FF]"
        div.innerHTML = `
          <!-- main-part-1 -->
              <div class="space-y-5 gap-2">
                   <div>
                        <p class="companyName font-medium">${interview.companyName}</p>
                        <p class="position text-[#64748B]">${interview.position}</p>
                   </div>

                   <div>
                       <p class="salary text-[#64748B]">${interview.salary}</p>
                   </div>

                   <div>
                      <p class="status bg-gray-300 p-1 w-[100px] border border-fuchsia-500 rounded-md text-center">${interview.status}</p>
                      <p class="notes text-[#323B49]">${interview.notes}</p>
                   </div>

                   <!-- button -->

                   <div>
                      <button class="interview-btn px-5 py-2 border border-green-500 text-green-500 rounded-2xl">interview</button>
                      <button class="Rejected-btn px-5 py-2 text-red-500 border border-red-500 rounded-2xl">Rejected</button>
                   </div>
              </div>
           <!-- main-part-2 -->
            <div>
                <button class="delete bg-purple-400 text-white px-5 py-3 rounded-xl"><i class="fa-regular fa-trash-can"></i> Delete</button>
            </div>


        `
         filterCardSection.appendChild(div)

    }

}

function rendarReject() {
    filterCardSection.innerHTML = ""

    if (RejectedList.length === 0) {
        showEmptyState("No jobs Available");
        return;
    }


    for( let reject of RejectedList ){
        console.log(reject);
        let div = document.createElement("div")
        div.className ="card flex justify-between rounded-2xl p-5 mt-5 bg-[#EEF4FF]"
        div.innerHTML = `
          <!-- main-part-1 -->
              <div class="space-y-5 gap-2 ">
                   <div>
                        <p class="companyName font-medium">${reject.companyName}</p>
                        <p class="position text-[#64748B]">${reject.position}</p>
                   </div>

                   <div>
                       <p class="salary text-[#64748B]">${reject.salary}</p>
                   </div>

                   <div>
                      <p class="status bg-gray-300 p-1 w-[100px] border border-fuchsia-500 rounded-md text-center">${reject.status}</p>
                      <p class="notes text-[#323B49]">${reject.notes}</p>
                   </div>

                   <!-- button -->

                   <div>
                      <button class="interview-btn px-5 py-2 border border-green-500 text-green-500 rounded-2xl">interview</button>
                      <button class="Rejected-btn px-5 py-2 text-red-500 border border-red-500 rounded-2xl">Rejected</button>
                   </div>
              </div>
           <!-- main-part-2 -->
            <div>
                <button class="delete bg-purple-400 text-white px-5 py-3 rounded-xl"><i class="fa-regular fa-trash-can"></i> Delete</button>
            </div>


        `
         filterCardSection.appendChild(div)

    }

}