// Selection from the databse using latest 2018 asynchrous programming

function loadData() {
  async function gettingData() {
    try {
      const fetchData = await fetch("php/load-table.php");
      const response = await fetchData.json();
      const tbody = document.querySelector("#tbody");
      if (response["null"]) {
        tbody.innerHTML =
          "<tr><td colspan='6' align='center'><h3>NO Record Found!</h3></td></tr>";
      } else {
        let tr = "";
        for (let item in response) {
          tr += `
            <tr>
            <td align="center">${response[item].id}</td>
            <td>${response[item].first_name}${response[item].last_name}</td>
            <td>${response[item].class_name}</td>
            <td>${response[item].city}</td>
            <td align="center"><button class="edit-btn" onclick="editRecord(${response[item].id})">Edit</button></td>
            <td align="center"><button class="delete-btn" onclick="deleteRecord(${response[item].id})">Delete</button></td>
            </tr>
            `;
        }
        tbody.innerHTML = tr;
      }
    } catch (error) {}
    showMessage("error", "Can't Fetch Data");
  }
  gettingData();
}
loadData();

// clearnign fields
function clearInputFields() {
  const firstName = document.querySelector("#fname");
  const lastName = document.querySelector("#lname");
  const city = document.querySelector("#city");
  const selectBox = document.querySelector("#classlist");

  firstName.value = "";
  lastName.value = "";
  city.value = "";
  selectBox.value = "";
}
// for modal
function addNewModal() {
  const modal = document.querySelector("#addModal");
  clearInputFields();
  modal.style.display = "block";
  async function gettingData() {
    try {
      const fetchData = await fetch("php/fetch-class-field.php");
      const response = await fetchData.json();
      let selectBox = document.querySelector("#classlist");
      let option = "<option selected disabled value='0'>Select Class</option>";
      for (let item of response) {
        option += `<option  value='${item.cid}'>${item.class_name}</option>`;
      }
      selectBox.innerHTML = option;
    } catch (error) {
      showMessage("error", "Can't Fetch Data");
    }
  }
  gettingData();
}
function hide_modal() {
  const modal = document.querySelector("#addModal");
  const editModel = document.querySelector("#modal");
  modal.style.display = "none";
  editModel.style.display = "none";
}
// insert data into databse
function submit_data() {
  const firstName = document.querySelector("#fname").value;
  const lastName = document.querySelector("#lname").value;
  const city = document.querySelector("#city").value;
  const selectBox = document.querySelector("#classlist").value;

  if (firstName === "" || lastName === "" || city === "" || selectBox === "") {
    alert("Please fill all the fields");
    return;
  } else {
    const allValues = {
      ftName: firstName,
      lName: lastName,
      city: city,
      selectBox: selectBox,
    };

    const jsonData = JSON.stringify(allValues);

    async function gettingData() {
      try {
        const fetchData = await fetch("php/fetch-insert.php", {
          method: "POST",
          body: jsonData,
          headers: {
            "Content-type": "application/json",
          },
        });

        const response = await fetchData.json();

        if (response.insert === "success") {
          showMessage("success", "Data inserted Successfully");
          loadData();
          hide_modal();
          clearInputFields();
        } else {
          showMessage("error", "Data couldn't be inserted Successfully");
          hide_modal();
        }
      } catch (error) {
        showMessage("error", "Data not inserted");
      }
    }

    gettingData();
  }
}

// update  data  from database
function editRecord(id) {
  const editModel = document.querySelector("#modal");
  editModel.style.display = "block";
  async function gettingData() {
    try {
      const fetchData = await fetch(`php/fetch-edit.php?editId=${id}`);
      const response = await fetchData.json();
      let selectBoxData = response["class"];
      let formData = response["response"];

      for (let formItem in formData) {
        document.querySelector("#edit-id").value = formData[formItem].id;
        document.querySelector("#edit-fname").value =
          formData[formItem].first_name;
        document.querySelector("#edit-lname").value =
          formData[formItem].last_name;
        document.querySelector("#edit-city").value = formData[formItem].city;
        let option = "";

        for (let selectBoxItem in selectBoxData) {
          let selectBox = document.querySelector("#edit-class");

          let selected = "";
          if (selectBoxData[selectBoxItem].cid === formData[formItem].class) {
            selected = "selected";
          } else {
            selected = "";
          }
          option += `<option ${selected} value="${selectBoxData[selectBoxItem].cid}">${selectBoxData[selectBoxItem].class_name}</option>`;
          selectBox.innerHTML = option;
        }
      }
    } catch (error) {
      showMessage("error", "Data not deleted ");
    }
  }

  gettingData();
}
// updateing inserting data /
function modify_data() {
  const firstName = document.querySelector("#edit-fname").value;
  const editId = document.querySelector("#edit-id").value;
  const lastName = document.querySelector("#edit-lname").value;
  const city = document.querySelector("#edit-city").value;
  const selectBox = document.querySelector("#edit-class").value;

  if (firstName === "" || lastName === "" || city === "" || selectBox === "0") {
    alert("Please fill all the fields");
    return;
  } else {
    const allValues = {
      editId: editId,
      ftName: firstName,
      lName: lastName,
      city: city,
      selectBox: selectBox,
    };

    const jsonData = JSON.stringify(allValues);

    async function gettingData() {
      try {
        const fetchData = await fetch("php/fetch-update.php", {
          method: "PUT",
          body: jsonData,
          headers: {
            "Content-type": "application/json",
          },
        });

        const response = await fetchData.json();

        if (response.update === "success") {
          showMessage("success", "Data updated Successfully");
          loadData();
          hide_modal();
        } else {
          showMessage("error", "Data couldn't be updated Successfully");
          hide_modal();
        }
      } catch (error) {
        showMessage("error", "Data not inserted");
      }
    }

    gettingData();
  }
}

// delete data into from database
function deleteRecord(id) {
  if (confirm("Are you sure you want to delete this record?")) {
    async function gettingData() {
      try {
        const fetchData = await fetch(`php/fetch-delete.php?delId=${id}`, {
          method: "DELETE",
        });

        const response = await fetchData.json();

        if (response.delete === "success") {
          showMessage("success", "Data Delted  Successfully");
          loadData();
        } else {
          showMessage("error", "Data couldn't be deleted Successfully");
        }
      } catch (error) {
        showMessage("error", "Data not deleted ");
      }
    }

    gettingData();
  }
}
// searching data
function load_search() {
  let searchVal = document.querySelector("#search").value;
  if (searchVal === "") {
    loadData();
    return false;
  } else {
    async function gettingData() {
      try {
        const fetchData = await fetch(
          `php/fetch-search.php?query=${searchVal}`
        );
        const response = await fetchData.json();
        const tbody = document.querySelector("#tbody");
        if (response["null"]) {
          tbody.innerHTML =
            "<tr><td colspan='6' align='center'><h3>NO Record Found!</h3></td></tr>";
        } else {
          let tr = "";
          for (let item in response) {
            tr += `
              <tr>
              <td align="center">${response[item].id}</td>
              <td>${response[item].first_name}${response[item].last_name}</td>
              <td>${response[item].class_name}</td>
              <td>${response[item].city}</td>
              <td align="center"><button class="edit-btn" onclick="editRecord(${response[item].id})">Edit</button></td>
              <td align="center"><button class="delete-btn" onclick="deleteRecord(${response[item].id})">Delete</button></td>
              </tr>
              `;
          }
          tbody.innerHTML = tr;
          showMessage("success", " searched Data Successfully");
        }
      } catch (error) {
        console.log(error)
      }
    }
    gettingData();
  }
}

// showing massaage
function showMessage(type, text) {
  const errorMessage = document.querySelector("#error-message");
  const successMessage = document.querySelector("#success-message");
  if (type === "error") {
    errorMessage.style.display = "block";
    errorMessage.textContent = text;
    setTimeout(() => {
      errorMessage.style.display = "none";
    }, 3000);
  } else {
    successMessage.style.display = "block";
    successMessage.textContent = "Successfully Fetched Data";
    setTimeout(() => {
      successMessage.style.display = "none";
    }, 3000);
  }
}

showMessage();
