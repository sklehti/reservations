import swal from "sweetalert";

function Alert(title, text, icon, button, dangerMode) {
  return swal({
    title: title,
    text: text,
    icon: icon,
    buttons: button,
    dangerMode: dangerMode,
  });
}

export default Alert;
