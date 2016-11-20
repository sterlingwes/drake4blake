const sidebarDiv = document.getElementById('sidebar')

function toggleSidebar () {
  if (window.innerWidth <= 1350) {
    sidebarDiv.style.display = 'none'
  } else {
    sidebarDiv.style.display = 'block'
  }
}

toggleSidebar()

window.onresize = function () {
  toggleSidebar()
}

module.exports = {
  fadeIn () {
    ['container', 'sidebar'].forEach(div => {
      document.getElementById(div).className = ''
    })
    document.getElementById('loading').style.display = 'none'
  }
}
