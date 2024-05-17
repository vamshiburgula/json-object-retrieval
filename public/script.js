 async function loadSubmissions() {
        const response = await fetch('/submissions');
        const submissions = await response.json();
        const submissionsDiv = document.getElementById('submissions');
        submissionsDiv.innerHTML = submissions.map(submission => `
            <div class="bg-gray-700 rounded-lg p-4 mb-4">
                <p class="text-white"><strong>Name:</strong> ${submission.name}</p>
                <p class="text-white"><strong>Email:</strong> ${submission.email}</p>
                <p class="text-white"><strong>Age:</strong> ${submission.age}</p>
                <p class="text-white"><strong>Message:</strong> ${submission.message}</p>
                <p class="text-white"><strong>Submitted At:</strong> ${new Date(submission.submitted_at).toLocaleString()}</p>
            </div>
        `).join('');
    }

    document.addEventListener('DOMContentLoaded', loadSubmissions);
