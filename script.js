let students = JSON.parse(localStorage.getItem('students')) || [];

    function renderTable() {
      const tbody = document.querySelector('#studentTable tbody');
      if (!tbody) return;
    
      tbody.innerHTML = '';
    
      students.forEach((student, index) => {
        const row = document.createElement('tr');
        const performanceClass = student.score >= 75 ? 'grade-high' : 'grade-low';
    
        row.innerHTML = `
          <td>${index + 1}</td>
          <td>${student.name}</td>
          <td>${student.subject}</td>
          <td>
            <span class="score-text">${student.score}</span>
            <input class="edit-score" type="number" min="0" max="100" value="${student.score}" style="display:none; width: 70px;">
          </td>
          <td class="${performanceClass}">
            ${student.score >= 75 ? 'Good' : 'Needs Improvement'}
          </td>
          <td class="actions">
            <button class="edit-btn" data-index="${index}">Edit</button>
            <button class="save-btn" data-index="${index}" style="display:none;">Save</button>
            <button class="delete-btn" data-index="${index}">Delete</button>
          </td>
        `;
    
        tbody.appendChild(row);
      });
    
      // Attach event listeners
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'));
      deleteStudent(index);
    });
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'));
      enterEditMode(index);
    });
  });

  document.querySelectorAll('.save-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'));
      saveEdit(index);
    });
  });
}

function enterEditMode(index) {
  const row = document.querySelectorAll('#studentTable tbody tr')[index];
  row.querySelector('.score-text').style.display = 'none';
  row.querySelector('.edit-score').style.display = 'inline-block';

  row.querySelector('.edit-btn').style.display = 'none';
  row.querySelector('.save-btn').style.display = 'inline-block';
}

function saveEdit(index) {
  const row = document.querySelectorAll('#studentTable tbody tr')[index];
  const newScore = parseInt(row.querySelector('.edit-score').value.trim());

  if (isNaN(newScore) || newScore < 0 || newScore > 100) {
    alert('Please enter a valid score between 0 and 100.');
    return;
  }

  students[index].score = newScore;
  saveData(); // Save to localStorage and re-render table
}
    
    function saveData() {
      localStorage.setItem('students', JSON.stringify(students));
      renderTable();
    }
    
    if (students.length === 0) {
      students = [
        { name: "Alice", subject: "Math", score: 92 },
        { name: "Bob", subject: "English", score: 76 },
        { name: "Charlie", subject: "Science", score: 64 },
        { name: "David", subject: "Math", score: 85 },
        { name: "Ella", subject: "English", score: 58 },
        { name: "Frank", subject: "Science", score: 71 },
        { name: "Grace", subject: "Math", score: 99 },
        { name: "Henry", subject: "English", score: 80 },
        { name: "Ivy", subject: "Science", score: 45 },
        { name: "Jack", subject: "Math", score: 68 },
        { name: "Karen", subject: "English", score: 73 },
        { name: "Liam", subject: "Science", score: 88 },
        { name: "Mona", subject: "Math", score: 91 },
        { name: "Nate", subject: "English", score: 62 },
        { name: "Olive", subject: "Science", score: 94 },
        { name: "Paul", subject: "Math", score: 74 },
        { name: "Queenie", subject: "English", score: 55 },
        { name: "Rick", subject: "Science", score: 79 },
        { name: "Sophie", subject: "Math", score: 81 },
        { name: "Tom", subject: "English", score: 50 },
        { name: "Uma", subject: "Science", score: 66 },
        { name: "Victor", subject: "Math", score: 93 },
        { name: "Wendy", subject: "English", score: 86 },
        { name: "Xander", subject: "Science", score: 48 },
        { name: "Yara", subject: "Math", score: 90 },
        { name: "Zack", subject: "English", score: 79 },
        { name: "Ava", subject: "Science", score: 100 },
        { name: "Ben", subject: "Math", score: 60 },
        { name: "Cleo", subject: "English", score: 72 },
        { name: "Dean", subject: "Science", score: 84 }
      ];
    
      saveData(); // safe now since renderTable is defined
    }
    
    function addStudent() {
      const name = document.getElementById('studentName').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const score = parseInt(document.getElementById('score').value.trim());
    
      if (!name || !subject || isNaN(score) || score < 0 || score > 100) {
        alert('Please enter valid data.');
        return;
      }
    
      // Add the new student at the beginning of the array
      students.unshift({ name, subject, score });
    
      saveData();
    
      document.getElementById('studentName').value = '';
      document.getElementById('subject').value = '';
      document.getElementById('score').value = '';
    }
    
    
    function deleteStudent(index) {
      if (index >= 0 && index < students.length) {
        const confirmDelete = confirm(`Are you sure you want to delete the record for ${students[index].name}?`);
        if (confirmDelete) {
          students.splice(index, 1);
          saveData();
        }
      } else {
        alert("Invalid student index. Cannot delete.");
      }
    }
    
    window.addEventListener("DOMContentLoaded", () => {
      renderTable();
    });

    function searchStudent() {
      const query = document.getElementById('searchInput').value.toLowerCase();
      const tbody = document.querySelector('#studentTable tbody');
      const rows = tbody.querySelectorAll('tr');
    
      rows.forEach(row => {
        const nameCell = row.querySelector('td:nth-child(2)');
        if (nameCell) {
          const nameText = nameCell.textContent.toLowerCase();
          if (nameText.includes(query)) {
            row.style.display = '';
          } else {
            row.style.display = 'none';
          }
        }
      });
    }