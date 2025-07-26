document.addEventListener('lanyardUpdate', async function (event) {
    if (event.detail.enabled === true) {
        const res = await fetch(`https://lanyard.rest/v1/users/${event.detail.discordId}`);
        if (!res.ok) { return console.error("Lanyard API error: Could not fetch discord user status."); }
        const up_data = await res.json();
        if (!up_data.success) { return console.error("Lanyard API error: Could not fetch discord user status."); }
        const data = up_data.data;

        const avatar = `https://cdn.discordapp.com/avatars/299265668522442752/${data.discord_user.avatar}.webp?size=512`
        document.getElementById("lanyardStatusPicture").src = avatar;
        document.getElementById("lanyardStatusName").textContent = data.discord_user.global_name;

        if (data.discord_status === "online") {
            document.getElementById("lanyardStatusCircle").classList = ["indicator indicator-online"];
            document.getElementById("lanyardStatusValue").classList = ["pfp-status status-online"];
            document.getElementById("lanyardStatusPicture").classList = ["pfp pfp-online"];
            document.getElementById("lanyardStatusValue").textContent = "Online";
        } else if (data.discord_status === "idle") {
            document.getElementById("lanyardStatusCircle").classList = ["indicator indicator-idle"];
            document.getElementById("lanyardStatusValue").classList = ["pfp-status status-idle"];
            document.getElementById("lanyardStatusPicture").classList = ["pfp pfp-idle"];
            document.getElementById("lanyardStatusValue").textContent = "Away";
        } else if (data.discord_status === "dnd") {
            document.getElementById("lanyardStatusCircle").classList = ["indicator indicator-dnd"];
            document.getElementById("lanyardStatusValue").classList = ["pfp-status status-dnd"];
            document.getElementById("lanyardStatusPicture").classList = ["pfp pfp-dnd"];
            document.getElementById("lanyardStatusValue").textContent = "Do Not Disturb";
        } else if (data.discord_status === "offline") {
            document.getElementById("lanyardStatusCircle").classList = ["indicator indicator-offline"];
            document.getElementById("lanyardStatusValue").classList = ["pfp-status status-offline"];
            document.getElementById("lanyardStatusPicture").classList = ["pfp pfp-offline"];
            document.getElementById("lanyardStatusValue").textContent = "Offline";
        } else {
            console.error("Lanyard API error: Unknown discord status");
        }

        if (!event.detail.enablePicture) {
            document.getElementById("lanyardStatusPicture").style.display = "none";
        }
        if (!event.detail.enableName) {
            document.getElementById("lanyardStatusName").style.display = "none";
        }
        if (!event.detail.enableStatus) {
            document.getElementById("lanyardStatusCircle").style.display = "none";
            document.getElementById("lanyardStatusValue").style.display = "none";
        }
    } else {
        document.getElementById("lanyardContainer").style.display = "none";
    }
});
