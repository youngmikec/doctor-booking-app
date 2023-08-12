//"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var loadFile = function loadFile(event) {
  var output = $("#image-preview");
  if ($('#image-clinic').val()) {
    output.removeClass('d-none');
    output.addClass('d-block');
    output.attr('src', URL.createObjectURL(event.target.files[0]));
  }
};
function loadImageUserSetting() {
  var output = $("#img-user-setting");
  if ($('#update-avatar').val()) {
    output.attr('src', URL.createObjectURL(event.target.files[0]));
  }
}
function createNewPost(markdown, converter) {
  $('#createNewPost').on('click', function (event) {
    var formData = new FormData($('form#formCreateNewPost')[0]);
    var contentMarkdown = markdown.value();
    var contentHTML = converter.makeHtml(contentMarkdown);
    formData.append('contentMarkdown', contentMarkdown);
    formData.append('contentHTML', contentHTML);
    formData.append('title', $('#title-post').val());
    var data = {};
    var _iterator = _createForOfIteratorHelper(formData.entries()),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var pair = _step.value;
        data[pair[0]] = pair[1];
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    $.ajax({
      method: "POST",
      url: "".concat(window.location.origin, "/supporter/manage/post/create"),
      data: data,
      success: function success(data) {
        alert('A new post is created successfully!');
        window.location.href = "".concat(window.location.origin, "/supporter/manage/posts");
      },
      error: function (_error) {
        function error(_x) {
          return _error.apply(this, arguments);
        }
        error.toString = function () {
          return _error.toString();
        };
        return error;
      }(function (error) {
        alertify.error('An error occurs, please try again later!');
        console.log(error);
      })
    });
  });
}
function deleteClinicById() {
  $('.delete-specific-clinic').bind('click', function (e) {
    e.preventDefault();
    if (!confirm('Delete this clinic?')) {
      return;
    }
    var id = $(this).data('clinic-id');
    var node = this;
    $.ajax({
      method: 'DELETE',
      url: "".concat(window.location.origin, "/admin/delete/clinic"),
      data: {
        id: id
      },
      success: function success(data) {
        node.closest("tr").remove();
        alertify.success('Delete succeed!');
      },
      error: function error(err) {
        alertify.error('An error occurs, please try again later!');
        console.log(err);
      }
    });
  });
}
function createNewClinic(markdownIntroClinic, converter) {
  $("#createNewClinic").on('click', function (e) {
    var formData = new FormData($('form#formCreateNewClinic')[0]);
    var contentMarkdown = markdownIntroClinic.value();
    var contentHTML = converter.makeHtml(contentMarkdown);

    //contain file upload
    if ($('#image-clinic').val()) {
      formData.append('introductionMarkdown', contentMarkdown);
      formData.append('introductionHTML', contentHTML);
      formData.append('image', document.getElementById('image-clinic').files[0]);
      handleCreateClinicNormal(formData);
    } else {
      // create without file upload
      var data = {
        introductionMarkdown: contentMarkdown,
        introductionHTML: contentHTML
      };
      var _iterator2 = _createForOfIteratorHelper(formData.entries()),
        _step2;
      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var pair = _step2.value;
          data[pair[0]] = pair[1];
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
      handleCreateClinicWithoutFile(data);
    }
  });
}
function handleCreateClinicWithoutFile(data) {
  $.ajax({
    method: "POST",
    url: "".concat(window.location.origin, "/admin/clinic/create-without-file"),
    data: data,
    success: function success(data) {
      alert('A new clinic is created successfully');
      window.location.href = "".concat(window.location.origin, "/users/manage/clinic");
    },
    error: function (_error2) {
      function error(_x2) {
        return _error2.apply(this, arguments);
      }
      error.toString = function () {
        return _error2.toString();
      };
      return error;
    }(function (error) {
      alertify.error('An error occurs, please try again later!');
      console.log(error);
    })
  });
}
function handleCreateClinicNormal(formData) {
  $.ajax({
    method: "POST",
    url: "".concat(window.location.origin, "/admin/clinic/create"),
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    success: function success(data) {
      alert('A new clinic is created successfully');
      window.location.href = "".concat(window.location.origin, "/users/manage/clinic");
    },
    error: function (_error3) {
      function error(_x3) {
        return _error3.apply(this, arguments);
      }
      error.toString = function () {
        return _error3.toString();
      };
      return error;
    }(function (error) {
      alertify.error('An error occurs, please try again later!');
      console.log(error);
    })
  });
}
function updateClinic(markdownIntroClinic, converter) {
  $('#btnUpdateClinic').on('click', function (e) {
    var clinicId = $('#btnUpdateClinic').data('clinic-id');
    var formData = new FormData($('form#formUpdateClinic')[0]);
    var contentMarkdown = markdownIntroClinic.value();
    var contentHTML = converter.makeHtml(contentMarkdown);

    //contain file upload
    if ($('#image-clinic').val()) {
      formData.append('introductionMarkdown', contentMarkdown);
      formData.append('introductionHTML', contentHTML);
      formData.append('image', document.getElementById('image-clinic').files[0]);
      formData.append('id', clinicId);
      handleUpdateClinicNormal(formData);
    } else {
      // create without file upload
      var data = {
        id: clinicId,
        introductionMarkdown: contentMarkdown,
        introductionHTML: contentHTML
      };
      var _iterator3 = _createForOfIteratorHelper(formData.entries()),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var pair = _step3.value;
          data[pair[0]] = pair[1];
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      handleUpdateClinicWithoutFile(data);
    }
  });
}
function handleUpdateClinicNormal(formData) {
  $.ajax({
    method: "PUT",
    url: "".concat(window.location.origin, "/admin/clinic/update"),
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    success: function success(data) {
      alert('Update succeeds');
      window.location.href = "".concat(window.location.origin, "/users/manage/clinic");
    },
    error: function (_error4) {
      function error(_x4) {
        return _error4.apply(this, arguments);
      }
      error.toString = function () {
        return _error4.toString();
      };
      return error;
    }(function (error) {
      alertify.error('An error occurs, please try again later!');
      console.log(error);
    })
  });
}
function handleUpdateClinicWithoutFile(data) {
  $.ajax({
    method: "PUT",
    url: "".concat(window.location.origin, "/admin/clinic/update-without-file"),
    data: data,
    success: function success(data) {
      alert('Update succeed');
      window.location.href = "".concat(window.location.origin, "/users/manage/clinic");
    },
    error: function (_error5) {
      function error(_x5) {
        return _error5.apply(this, arguments);
      }
      error.toString = function () {
        return _error5.toString();
      };
      return error;
    }(function (error) {
      alertify.error('An error occurs, please try again later!');
      console.log(error);
    })
  });
}
function showModalInfoClinic() {
  $('.info-specific-clinic').on('click', function (e) {
    e.preventDefault();
    var id = $(this).data('clinic-id');
    $.ajax({
      method: 'POST',
      url: "".concat(window.location.origin, "/api/get-info-clinic-by-id"),
      data: {
        id: id
      },
      success: function success(data) {
        $('#imageClinic').empty();
        $('#name').val(data.clinic.name);
        if (data.clinic.phone) {
          $('#phone').val(data.clinic.phone);
        } else {
          $('#phone').val('Has not been updated');
        }
        if (data.clinic.address) {
          $('#address').val(data.clinic.address);
        } else {
          $('#address').val('Has not been updated');
        }
        if (data.clinic.image) {
          $('#imageClinic').prepend("<img class=\"img-info-clinic\" src=\"/images/clinics/".concat(data.clinic.image, "\" />"));
        } else {
          $('#imageClinic').text('Has not been updated');
        }
        $('#modalInfoClinic').modal('show');
      },
      error: function (_error6) {
        function error(_x6) {
          return _error6.apply(this, arguments);
        }
        error.toString = function () {
          return _error6.toString();
        };
        return error;
      }(function (error) {
        alertify.error('An error occurs, please try again later!');
        console.log(error);
      })
    });
  });
}
function showModalSettingUser() {
  $('.user-setting').on('click', function (e) {
    e.preventDefault();
    $('#modalSettingUser').modal('show');
  });
}
function createNewDoctor() {
  $('#createNewDoctor').on('click', function (e) {
    e.preventDefault();
    var formData = new FormData($('form#formCreateNewDoctor')[0]);
    var data = {};
    var _iterator4 = _createForOfIteratorHelper(formData.entries()),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var pair = _step4.value;
        data[pair[0]] = pair[1];
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
    $.ajax({
      method: "POST",
      url: "".concat(window.location.origin, "/admin/doctor/create"),
      data: data,
      success: function success(data) {
        alert('Create a new doctor succeeds');
        window.location.href = "".concat(window.location.origin, "/users/manage/doctor");
      },
      error: function (_error7) {
        function error(_x7) {
          return _error7.apply(this, arguments);
        }
        error.toString = function () {
          return _error7.toString();
        };
        return error;
      }(function (error) {
        alertify.error('An error occurs, please try again later!');
        console.log(error);
      })
    });
  });
}
function deleteDoctorById() {
  $('.delete-doctor-info').on('click', function (e) {
    if (!confirm('Delete this doctor?')) {
      return;
    }
    var id = $(this).data('doctor-id');
    var node = this;
    $.ajax({
      method: 'DELETE',
      url: "".concat(window.location.origin, "/admin/delete/doctor"),
      data: {
        id: id
      },
      success: function success(data) {
        node.closest("tr").remove();
        alertify.success('Delete succeeds');
      },
      error: function error(err) {
        alertify.error('An error occurs, please try again later!');
        console.log(err);
      }
    });
  });
}
function showModalInfoDoctor() {
  $('.show-doctor-info').on('click', function (e) {
    e.preventDefault();
    var id = $(this).data('doctor-id');
    $.ajax({
      method: 'POST',
      url: "".concat(window.location.origin, "/api/get-info-doctor-by-id"),
      data: {
        id: id
      },
      success: function success(data) {
        $('#imageDoctor').empty();
        $('#nameDoctor').val(data.doctor.name);
        if (data.doctor.phone) {
          $('#phoneDoctor').val(data.doctor.phone);
        } else {
          $('#phoneDoctor').val('Has not been updated');
        }
        if (data.doctor.address) {
          $('#addressDoctor').val(data.doctor.address);
        } else {
          $('#addressDoctor').val('Has not been updated');
        }
        $('#specializationDoctor').val(data.doctor.specializationName);
        $('#clinicDoctor').val(data.doctor.clinicName);
        if (data.doctor.avatar) {
          $('#imageDoctor').prepend("<img class=\"img-info-clinic\" src=\"/images/users/".concat(data.doctor.avatar, "\" />"));
        } else {
          $('#imageDoctor').text('Has not been updated');
        }
        $('#modalInfoDoctor').modal('show');
      },
      error: function (_error8) {
        function error(_x8) {
          return _error8.apply(this, arguments);
        }
        error.toString = function () {
          return _error8.toString();
        };
        return error;
      }(function (error) {
        alertify.error('An error occurs, please try again later!');
        console.log(error);
      })
    });
  });
}
function updateDoctor() {
  $('#btnUpdateDoctor').on('click', function (e) {
    var doctorId = $('#btnUpdateDoctor').data('doctor-id');
    var formData = new FormData($('form#formUpdateDoctor')[0]);
    //contain file upload
    if ($('#image-clinic').val()) {
      formData.append('avatar', document.getElementById('image-clinic').files[0]);
      formData.append('id', doctorId);
      handleUpdateDoctorNormal(formData);
    } else {
      // create without file upload
      var data = {
        id: doctorId
      };
      var _iterator5 = _createForOfIteratorHelper(formData.entries()),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var pair = _step5.value;
          data[pair[0]] = pair[1];
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      handleUpdateDoctorWithoutFile(data);
    }
  });
}
function handleUpdateDoctorNormal(formData) {
  $.ajax({
    method: "PUT",
    url: "".concat(window.location.origin, "/admin/doctor/update"),
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    success: function success(data) {
      alert('Update succeeds');
      window.location.href = "".concat(window.location.origin, "/users/manage/doctor");
    },
    error: function (_error9) {
      function error(_x9) {
        return _error9.apply(this, arguments);
      }
      error.toString = function () {
        return _error9.toString();
      };
      return error;
    }(function (error) {
      alertify.error('An error occurs, please try again later!');
      console.log(error);
    })
  });
}
function handleUpdateDoctorWithoutFile(data) {
  $.ajax({
    method: "PUT",
    url: "".concat(window.location.origin, "/admin/doctor/update-without-file"),
    data: data,
    success: function success(data) {
      alert('Update succeeds');
      window.location.href = "".concat(window.location.origin, "/users/manage/doctor");
    },
    error: function (_error10) {
      function error(_x10) {
        return _error10.apply(this, arguments);
      }
      error.toString = function () {
        return _error10.toString();
      };
      return error;
    }(function (error) {
      alertify.error('An error occurs, please try again later!');
      console.log(error);
    })
  });
}
function deleteSpecializationById() {
  $('.delete-specialization').on('click', function (e) {
    if (!confirm('Delete this specialist?')) {
      return;
    }
    var id = $(this).data('specialization-id');
    var node = this;
    $.ajax({
      method: 'DELETE',
      url: "".concat(window.location.origin, "/admin/delete/specialization"),
      data: {
        id: id
      },
      success: function success(data) {
        node.closest("tr").remove();
        alertify.success('Delete succeeds');
      },
      error: function error(err) {
        alertify.error('An error occurs, please try again later!');
        console.log(err);
      }
    });
  });
}
function showPostsForSupporter() {
  var currentPage = 1;
  var total = $('#paginationForPost').data('total');
  if (total === 1) {
    $(' .li-next').addClass('disabled');
  }
  $('.page-post-next').on('click', function (e) {
    e.preventDefault();
    currentPage++;
    $(' .li-pre').removeClass('disabled');
    if (currentPage === total) {
      $(' .li-next').addClass('disabled');
    }
    if (currentPage > total) return;
    generateTablePostPagination(currentPage);
  });
  $('.page-post-pre').on('click', function (e) {
    e.preventDefault();
    currentPage--;
    $(' .li-next').removeClass('disabled');
    if (currentPage === 1) {
      $(' .li-pre').addClass('disabled');
    }
    if (currentPage === 0) return;
    generateTablePostPagination(currentPage);
  });
}
function generateTablePostPagination(page) {
  $.ajax({
    url: "".concat(window.location.origin, "/supporter/pagination/posts?page=").concat(page),
    method: 'GET',
    success: function success(data) {
      $("#listPostsTable tbody").empty();
      var html = '';
      data.posts.rows.forEach(function (post) {
        html += "\n                 <tr>\n                        <td> ".concat(post.id, "</td>\n                        <td>").concat(post.title, "</td>\n                        <td>").concat(post.writerName, "</td>\n                        <td>").concat(post.dateClient, "</td>\n                        <td class=\"\">\n                            <a class=\" \" href=\"/supporter/post/edit/").concat(post.id, "\" title=\"Edit info\"><i class=\"fas fa-pen-square mx-3\"></i></a>\n                            <a class=\"delete-post\" href=\"#\" data-post-id=\"").concat(post.id, "\" title=\"Delete\"><i class=\"fas fa-trash\"></i></a>\n                        </td>\n                   </tr>\n                ");
      });
      $("#listPostsTable tbody").append(html);
    },
    error: function error(err) {
      alertify.error('An error occurs, please try again later!');
      console.log(err);
    }
  });
}
function deletePostById() {
  $('.delete-post').on('click', function (e) {
    if (!confirm('Delete this post?')) {
      return;
    }
    var id = $(this).data('post-id');
    var node = this;
    $.ajax({
      method: 'DELETE',
      url: "".concat(window.location.origin, "/admin/delete/post"),
      data: {
        id: id
      },
      success: function success(data) {
        node.closest("tr").remove();
        alertify.success('Delete succeeds');
      },
      error: function error(err) {
        alertify.error('An error occurs, please try again later!');
        console.log(err);
      }
    });
  });
}
function updatePost(markdown, converter) {
  $('#btnUpdatePost').on('click', function (e) {
    var postId = $('#btnUpdatePost').data('post-id');
    var formData = new FormData($('form#formUpdatePost')[0]);
    var contentMarkdown = markdown.value();
    var contentHTML = converter.makeHtml(contentMarkdown);
    formData.append('contentMarkdown', contentMarkdown);
    formData.append('contentHTML', contentHTML);
    formData.append('title', $('#titlePost').val());
    var data = {
      id: postId
    };
    var _iterator6 = _createForOfIteratorHelper(formData.entries()),
      _step6;
    try {
      for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
        var pair = _step6.value;
        data[pair[0]] = pair[1];
      }
    } catch (err) {
      _iterator6.e(err);
    } finally {
      _iterator6.f();
    }
    $.ajax({
      method: "PUT",
      url: "".concat(window.location.origin, "/supporter/post/update"),
      data: data,
      success: function success(data) {
        alert('Update succeeds');
        window.location.href = "".concat(window.location.origin, "/supporter/manage/posts");
      },
      error: function (_error11) {
        function error(_x11) {
          return _error11.apply(this, arguments);
        }
        error.toString = function () {
          return _error11.toString();
        };
        return error;
      }(function (error) {
        alertify.error('An error occurs, please try again later!');
        console.log(error);
      })
    });
  });
}
function createScheduleByDoctor(scheduleArr) {
  $("#createNewScheduleDoctor").on("click", function () {
    if (scheduleArr.length === 0) {
      alertify.error('Have not selected a plan to save');
      return;
    }
    $.ajax({
      method: 'POST',
      url: "".concat(window.location.origin, "/doctor/manage/schedule/create"),
      data: {
        'schedule_arr': scheduleArr
      },
      success: function success(data) {
        if (data.status === 1) {
          alertify.success('Add a successful appointment');
        }
      },
      error: function (_error12) {
        function error(_x12) {
          return _error12.apply(this, arguments);
        }
        error.toString = function () {
          return _error12.toString();
        };
        return error;
      }(function (error) {
        alertify.error('An error occurs, please try again later!');
        console.log(error);
      })
    });
  });
}
function handleBtnSchedule() {
  var scheduleArr = [];
  $('.btn-schedule').unbind('click').bind('click', function (e) {
    var idBtn = $(this).attr('id');
    $("#".concat(idBtn)).toggleClass('btn btn-css');
    var time = $("#".concat(idBtn)).attr("value");
    var date = $("#datepicker").val();

    //check có class thì add new row, else try to remove
    if ($("#".concat(idBtn)).hasClass("btn-css")) {
      var item = {
        'date': date,
        'time': time,
        'id': "".concat(idBtn, "-").concat(date)
      };
      scheduleArr.push(item);
      $('#tableCreateSchedule tbody').append(" <tr id=\"row-".concat(idBtn, "\">\n                         <td>").concat(time, "</td>\n                         <td>").concat(date, "</td>\n                  </tr>"));
    } else {
      var count = -1;
      var timeCheck = $("#".concat(idBtn)).attr("value");
      var dateCheck = $("#datepicker").val();
      scheduleArr.forEach(function (x, index) {
        if (x.time === timeCheck && x.date === dateCheck) {
          count = index;
        }
      });
      if (count > -1) scheduleArr.splice(count, 1);
      $("table#tableCreateSchedule tr#row-".concat(idBtn)).remove();
    }
    scheduleArr.sort(function (a, b) {
      return a.time.localeCompare(b.time);
    });
  });
  return scheduleArr;
}
function handleChangeDatePicker(currentDate) {
  $('#datepicker').datepicker().on('changeDate', function (event) {
    var date = $("#datepicker").val();
    var dateConvert = stringToDate(date, "dd/MM/yyyy", "/");
    var currentDateConvert = stringToDate(currentDate, "dd/MM/yyyy", "/");
    if (dateConvert >= currentDateConvert) {
      //continue, refresh button
      $('.btn-schedule').removeClass('btn-css').addClass('btn');
    } else {
      $('#datepicker').datepicker("setDate", new Date());
      alertify.error('Cant create a medical plan for the past');
    }
  });
}
function stringToDate(_date, _format, _delimiter) {
  var formatLowerCase = _format.toLowerCase();
  var formatItems = formatLowerCase.split(_delimiter);
  var dateItems = _date.split(_delimiter);
  var monthIndex = formatItems.indexOf("mm");
  var dayIndex = formatItems.indexOf("dd");
  var yearIndex = formatItems.indexOf("yyyy");
  var month = parseInt(dateItems[monthIndex]);
  month -= 1;
  return new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
}
function loadNewPatientsForSupporter() {
  $.ajax({
    url: "".concat(window.location.origin, "/supporter/get-patients-for-tabs"),
    method: 'POST',
    success: function success(data) {
      var countNew = data.object.newPatients.length;
      var countPending = data.object.pendingPatients.length;
      var countConfirmed = data.object.confirmedPatients.length;
      var countCanceled = data.object.canceledPatients.length;
      $('#count-new').text("".concat(countNew));
      $('#count-need').text("".concat(countPending));
      $('#count-confirmed').text("".concat(countConfirmed));
      $('#count-canceled').text("".concat(countCanceled));
      var htmlNew,
        htmlPending,
        htmlConfirmed,
        htmlCanceled = '';
      data.object.newPatients.forEach(function (patient) {
        htmlNew += "\n                <tr>\n                    <td> ".concat(patient.id, " - ").concat(patient.name, "   </td>\n                    <td> ").concat(patient.phone, "     </td>\n                    <td> ").concat(patient.email, "     </td>\n                    <td>").concat(convertStringToDateClient(patient.updatedAt), "      </td>\n                    <td> \n                    <button type=\"button\"  data-patient-id=\"").concat(patient.id, "\" class=\"ml-3 btn btn-primary btn-new-patient-ok\"> Receive</button>\n                    <button  type=\"button\" data-patient-id=\"").concat(patient.id, "\" class=\"ml-3 btn btn-danger btn-new-patient-cancel\"> Cancel </button>\n                    </td>\n                </tr>\n                ");
      });
      data.object.pendingPatients.forEach(function (patient) {
        htmlPending += "\n                <tr>\n                    <td> ".concat(patient.id, " - ").concat(patient.name, "   </td>\n                    <td> ").concat(patient.phone, "     </td>\n                    <td> ").concat(patient.email, "     </td>\n                    <td> ").concat(convertStringToDateClient(patient.updatedAt), "      </td>\n                    <td> \n                    <button  data-patient-id=\"").concat(patient.id, "\"  class=\"ml-3 btn btn-warning btn-pending-patient\">Confirm</button>\n                    <button  type=\"button\" data-patient-id=\"").concat(patient.id, "\" class=\"ml-3 btn btn-danger btn-pending-patient-cancel\"> Cancel </button>\n                    </td>\n                </tr>\n                ");
      });
      data.object.confirmedPatients.forEach(function (patient) {
        htmlConfirmed += "\n                <tr>\n                    <td> ".concat(patient.id, " - ").concat(patient.name, "   </td>\n                    <td> ").concat(patient.phone, "     </td>\n                    <td> ").concat(patient.email, "     </td>\n                    <td> ").concat(convertStringToDateClient(patient.updatedAt), "     </td>\n                    <td> \n                    <button  type=\"button\" data-patient-id=\"").concat(patient.id, "\"  class=\"ml-3 btn btn-info btn-confirmed-patient\"> Information</button>\n                    </td>\n                </tr>\n                ");
      });
      data.object.canceledPatients.forEach(function (patient) {
        htmlCanceled += "\n                <tr>\n                    <td> ".concat(patient.id, " - ").concat(patient.name, "   </td>\n                    <td> ").concat(patient.phone, "     </td>\n                    <td> ").concat(patient.email, "     </td>\n                    <td> ").concat(convertStringToDateClient(patient.updatedAt), " </td>\n                    <td> \n                    <button   data-patient-id=\"").concat(patient.id, "\"  class=\"ml-3 btn btn-primary btn-history-cancel-patient\">History</button>\n                    </td>\n                </tr>\n                ");
      });
      $('#tableNewPatients tbody').append(htmlNew);
      $('#tableNeedConfirmPatients tbody').append(htmlPending);
      $('#tableConfirmedPatients tbody').append(htmlConfirmed);
      $('#tableCancelPatients tbody').append(htmlCanceled);
    },
    error: function (_error13) {
      function error(_x13) {
        return _error13.apply(this, arguments);
      }
      error.toString = function () {
        return _error13.toString();
      };
      return error;
    }(function (error) {
      console.log(error);
      alertify.error('An error occurs, please try again later!');
    })
  });
}
function handleBtnNewPatientOk() {
  $("#tableNewPatients").on("click", ".btn-new-patient-ok", function (e) {
    if (!confirm('Do you want to confirm admission of this patient?')) {
      return;
    }
    var countNew = +$('#count-new').text();
    var countPending = +$('#count-need').text();
    var patientId = $(this).data('patient-id');
    this.closest("tr").remove();
    countNew--;
    countPending++;
    $('#count-new').text(countNew);
    $('#count-need').text(countPending);
    $.ajax({
      url: "".concat(window.location.origin, "/supporter/change-status-patient"),
      method: 'POST',
      data: {
        patientId: patientId,
        status: 'pending'
      },
      success: function success(data) {
        var patient = data.patient;
        addNewRowTablePending(patient);
      },
      error: function (_error14) {
        function error(_x14) {
          return _error14.apply(this, arguments);
        }
        error.toString = function () {
          return _error14.toString();
        };
        return error;
      }(function (error) {
        console.log(error);
        alertify.error('An error occurs, please try again later!');
      })
    });
  });
}
function handleBtnNewPatientCancel() {
  $("#tableNewPatients").on("click", ".btn-new-patient-cancel", function (e) {
    $('#btnCancelBookingPatient').attr('data-patient-id', $(this).data('patient-id'));
    $('#btnCancelBookingPatient').attr('data-type', 'new-patient-cancel');
    $('#modalCancelBooking').modal('show');
  });
}
function callAjaxRenderModalInfo(patientId, option) {
  $.ajax({
    method: 'POST',
    url: "".concat(window.location.origin, "/api/get-detail-patient-by-id"),
    data: {
      patientId: patientId
    },
    success: function success(data) {
      $('#patientName').val(data.name);
      $('#btn-confirm-patient-done').attr('data-patient-id', data.id);
      $('#patientPhone').val(data.phone);
      $('#patientEmail').val(data.email);
      $('#patientDate').val(data.dateBooking);
      $('#patientTime').val(data.timeBooking);
      $('#patientReason').text(data.description);
      $('#patientAddress').text(data.address);
      if (data.ExtraInfo) {
        $('#patientHistoryBreath').text(data.ExtraInfo.historyBreath);
        $('#patientMoreInfo').text(data.ExtraInfo.moreInfo);
      }
      if (option) {
        $('#btn-confirm-patient-done').css('display', 'none');
        $('#btn-cancel-patient').text("OK");
      }
      $('#modalDetailPatient').modal('show');
    },
    error: function (_error15) {
      function error(_x15) {
        return _error15.apply(this, arguments);
      }
      error.toString = function () {
        return _error15.toString();
      };
      return error;
    }(function (err) {
      console.log(error);
      alertify.error('An error occurs, please try again later!');
    })
  });
}
function handleBtnPendingPatient() {
  $("#tableNeedConfirmPatients").on("click", ".btn-pending-patient", function (e) {
    var patientId = $(this).data('patient-id');
    var option = false;
    callAjaxRenderModalInfo(patientId, option);
  });
}
function handleBtnPendingCancel() {
  $("#tableNeedConfirmPatients").on("click", ".btn-pending-patient-cancel", function (e) {
    $('#btnCancelBookingPatient').attr('data-patient-id', $(this).data('patient-id'));
    $('#btnCancelBookingPatient').attr('data-type', 'pending-patient-cancel');
    $('#modalCancelBooking').modal('show');
  });
}
function addNewRowTablePending(patient) {
  var htmlPending = "\n                 <tr>\n                    <td> ".concat(patient.id, " - ").concat(patient.name, "   </td>\n                    <td> ").concat(patient.phone, "     </td>\n                    <td> ").concat(patient.email, "     </td>\n                    <td> ").concat(convertStringToDateClient(patient.updatedAt), "     </td>\n                    <td> \n                    <button  data-patient-id=\"").concat(patient.id, "\"  class=\"ml-3 btn btn-warning btn-pending-patient\">Confirm</button>\n                    <button  type=\"button\" data-patient-id=\"").concat(patient.id, "\" class=\"ml-3 btn btn-danger btn-pending-patient-cancel\"> Cancel </button>\n                    </td>\n                </tr>\n               \n                ");
  $('#tableNeedConfirmPatients tbody').prepend(htmlPending);
}
function addNewRowTableConfirmed(patient) {
  var htmlConfirmed = "\n                <tr>\n                    <td> ".concat(patient.id, " - ").concat(patient.name, "   </td>\n                    <td> ").concat(patient.phone, "     </td>\n                    <td> ").concat(patient.email, "     </td>\n                    <td> ").concat(convertStringToDateClient(patient.updatedAt), "     </td>\n                    <td> \n                    <button  type=\"button\" data-patient-id=\"").concat(patient.id, "\"  class=\"ml-3 btn btn-info btn-confirmed-patient\"> Information</button>\n                    </td>\n                </tr>\n                ");
  $('#tableConfirmedPatients tbody').prepend(htmlConfirmed);
}
function addNewRowTableCanceled(patient) {
  var htmlPending = "\n                  <tr>\n                    <td> ".concat(patient.id, " - ").concat(patient.name, "   </td>\n                    <td> ").concat(patient.phone, "     </td>\n                    <td> ").concat(patient.email, "     </td>\n                    <td> ").concat(convertStringToDateClient(patient.updatedAt), " </td>\n                    <td> \n                    <button   data-patient-id=\"").concat(patient.id, "\"  class=\"ml-3 btn btn-primary btn-history-cancel-patient\">History</button>\n                    </td>\n                </tr>\n               \n                ");
  $('#tableCancelPatients tbody').prepend(htmlPending);
}
function convertStringToDateClient(string) {
  return moment(Date.parse(string)).format("DD/MM/YYYY, HH:mm A");
}
function handleAfterCallingPatient() {
  $('#btn-confirm-patient-done').on('click', function (e) {
    if (!confirm('Have you phoned to confirm whether the patient has an appointment?')) {
      return;
    }
    var countPending = +$('#count-need').text();
    var countConfirmed = +$('#count-confirmed').text();
    countPending--;
    countConfirmed++;
    $('#modalDetailPatient').modal('hide');
    var patientId = $('#btn-confirm-patient-done').attr('data-patient-id');
    $('#tableNeedConfirmPatients tbody').find(".btn-pending-patient[data-patient-id=".concat(patientId, "]")).closest("tr").remove();
    $('#count-need').text(countPending);
    $('#count-confirmed').text(countConfirmed);
    $.ajax({
      url: "".concat(window.location.origin, "/supporter/change-status-patient"),
      method: 'POST',
      data: {
        patientId: patientId,
        status: 'confirmed'
      },
      success: function success(data) {
        console.log(data);
        var patient = data.patient;
        addNewRowTableConfirmed(patient);
      },
      error: function (_error16) {
        function error(_x16) {
          return _error16.apply(this, arguments);
        }
        error.toString = function () {
          return _error16.toString();
        };
        return error;
      }(function (error) {
        console.log(error);
        alertify.error('An error occurs, please try again later!');
      })
    });
  });
}
function handleViewInfoPatientBooked() {
  $("#tableConfirmedPatients").on("click", ".btn-confirmed-patient", function (e) {
    var patientId = $(this).data('patient-id');
    var option = true;
    callAjaxRenderModalInfo(patientId, option);
  });
}
function handleCancelBtn() {
  $('#btnCancelBookingPatient').on('click', function (e) {
    var formData = new FormData($('form#formCancelBooking')[0]);
    var data = {};
    var text = '';
    var _iterator7 = _createForOfIteratorHelper(formData.entries()),
      _step7;
    try {
      for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
        var pair = _step7.value;
        data[pair[0]] = pair[1];
      }
    } catch (err) {
      _iterator7.e(err);
    } finally {
      _iterator7.f();
    }
    if (data.reasonCancel === 'reason3') {
      if (!$('#otherReason').val()) {
        alert('Please fill in more information for another reason');
        return;
      }
      text = "Other reason: ".concat($('#otherReason').val(), " ");
    } else if (data.reasonCancel === 'reason2') {
      text = 'The patient canceled the schedule';
    } else {
      text = 'Spam clinic appointment, not real';
    }
    var patientId = $('#btnCancelBookingPatient').attr('data-patient-id');
    var type = $('#btnCancelBookingPatient').attr('data-type');
    if (type === 'pending-patient-cancel') {
      var countPending = +$('#count-need').text();
      var countCancel = +$('#count-canceled').text();
      countPending--;
      countCancel++;
      $('#tableNeedConfirmPatients tbody').find(".btn-pending-patient-cancel[data-patient-id=".concat(patientId, "]")).closest("tr").remove();
      $('#count-need').text(countPending);
      $('#count-canceled').text(countCancel);
    } else {
      var countNew = +$('#count-new').text();
      var _countCancel = +$('#count-canceled').text();
      countNew--;
      _countCancel++;
      $('#tableNewPatients tbody').find(".btn-new-patient-cancel[data-patient-id=".concat(patientId, "]")).closest("tr").remove();
      $('#count-new').text(countNew);
      $('#count-canceled').text(_countCancel);
    }
    $('#modalCancelBooking').modal('hide');
    $.ajax({
      url: "".concat(window.location.origin, "/supporter/change-status-patient"),
      method: 'POST',
      data: {
        patientId: patientId,
        status: 'failed',
        reason: text
      },
      success: function success(data) {
        var patient = data.patient;
        addNewRowTableCanceled(patient);
      },
      error: function (_error17) {
        function error(_x17) {
          return _error17.apply(this, arguments);
        }
        error.toString = function () {
          return _error17.toString();
        };
        return error;
      }(function (error) {
        console.log(error);
        alertify.error('An error occurs, please try again later!');
      })
    });
  });
}
function handleBtnViewHistory() {
  $('#tableCancelPatients').on('click', '.btn-history-cancel-patient', function () {
    var patientId = $(this).data('patient-id');
    $('#btn-view-history').attr('data-patient-id', patientId);
    $.ajax({
      url: "".concat(window.location.origin, "/supporter/get-logs-patient"),
      method: 'POST',
      data: {
        patientId: patientId
      },
      success: function success(data) {
        $("#contentHistory").empty();
        var html = '';
        data.forEach(function (log) {
          html += "\n                     <div class=\"form-row mb-3\">\n                            <div class=\"col-6\">\n                                <input type=\"text\"  class=\"form-control\" id=\"historyStatus\" value=\"".concat(log.content, "\">\n                            </div>\n                            <div class=\"col-3\">\n                                <input type=\"text\"  class=\"form-control\" id=\"personDone\" value=\"").concat(log.supporterName, "\">\n                            </div>\n                            <div class=\"col-3\">\n                                <input type=\"text\"  class=\"form-control\" id=\"timeDone\" value=\"").concat(convertStringToDateClient(log.createdAt), " \">\n                            </div>\n                        </div>\n                    \n                    ");
        });
        $('#contentHistory').append(html);
        $('#modalHistoryBooking').modal('show');
      },
      error: function (_error18) {
        function error(_x18) {
          return _error18.apply(this, arguments);
        }
        error.toString = function () {
          return _error18.toString();
        };
        return error;
      }(function (error) {
        console.log(error);
        alertify.error('An error occurs, please try again later!');
      })
    });
  });
}
function handleDoctorViewInfoPatient() {
  $('.doctor-view-detail').on('click', function (e) {
    var patientId = $(this).attr('data-patient-id');
    $.ajax({
      method: 'POST',
      url: "".concat(window.location.origin, "/api/get-detail-patient-by-id"),
      data: {
        patientId: patientId
      },
      success: function success(data) {
        $('#imageOldForms').empty();
        $('#patientName').val(data.name);
        $('#patientPhone').val(data.phone);
        $('#patientEmail').val(data.email);
        $('#patientDate').val(data.dateBooking);
        $('#patientTime').val(data.timeBooking);
        $('#patientReason').text(data.description);
        $('#patientAddress').text(data.address);
        if (data.ExtraInfo) {
          $('#patientHistoryBreath').text(data.ExtraInfo.historyBreath);
          $('#patientMoreInfo').text(data.ExtraInfo.moreInfo);
          if (data.ExtraInfo.oldForms) {
            var images = JSON.parse(data.ExtraInfo.oldForms);
            var html = '';
            for (var _i = 0, _Object$entries = Object.entries(images); _i < _Object$entries.length; _i++) {
              var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                key = _Object$entries$_i[0],
                value = _Object$entries$_i[1];
              html += "\n                              <a href=\"/images/patients/".concat(value, "\" class=\"mr-3\" target=\"_blank\" title=\"Click to show the image\">\n                                <span>").concat(value, "</span>\n                              </a>\n                            ");
            }
            $('#imageOldForms').append(html);
          } else {
            $('#imageOldForms').append("<span>No information</span>");
          }
        }
        $('#modalDetailPatientForDoctor').modal('show');
      },
      error: function (_error19) {
        function error(_x19) {
          return _error19.apply(this, arguments);
        }
        error.toString = function () {
          return _error19.toString();
        };
        return error;
      }(function (err) {
        console.log(error);
        alertify.error('An error occurs, please try again later!');
      })
    });
  });
}
function showModalSendForms() {
  $('.doctor-send-forms').on('click', function (e) {
    var patientId = $(this).attr('data-patient-id');
    var isSend = $(this).attr('data-is-send-forms');
    $.ajax({
      url: "".concat(window.location.origin, "/api/get-detail-patient-by-id"),
      method: "POST",
      data: {
        patientId: patientId
      },
      success: function success(data) {
        var html = '';
        $('#divGenerateFilesSend').empty();
        $('#emailPatient').val(data.email);
        $('#btnSendFilesForms').attr('data-patient-id', patientId);
        if (data.ExtraInfo) {
          if (data.ExtraInfo.sendForms) {
            var images = JSON.parse(data.ExtraInfo.sendForms);
            for (var _i2 = 0, _Object$entries2 = Object.entries(images); _i2 < _Object$entries2.length; _i2++) {
              var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
                key = _Object$entries2$_i[0],
                value = _Object$entries2$_i[1];
              html += "\n                              <div class=\"form-row\">\n                                <div class=\"form-group col-9\">\n                                    <a type=\"text\" class=\"form-control\" id=\"nameFileSent\" target=\"_blank\" href=\"/images/patients/remedy/".concat(value, "\" readonly=\"true\" title=\"").concat(value, "\" >\n                               ").concat(value, "\n                                </a>\n                                </div>\n                             </div>");
            }
          } else {
            html = "\n                          <div class=\"form-row\">\n                            <div class=\"form-group col-9\">\n                                <label class=\"col-form-label text-label\" for=\"nameFileSent\"> File's name:</label>\n                                <input type=\"text\" class=\"form-control\" id=\"nameFileSent\" name=\"nameFileSent\" disabled>\n                            </div>\n                         </div>";
          }
        }
        $('#divGenerateFilesSend').append(html);
        $('#modalSendForms').modal('show');
      },
      error: function (_error20) {
        function error(_x20) {
          return _error20.apply(this, arguments);
        }
        error.toString = function () {
          return _error20.toString();
        };
        return error;
      }(function (error) {
        console.log(error);
        alertify.error('An error occurs, please try again later!');
      })
    });
  });
}
function handleSendFormsForPatient() {
  $('#btnSendFilesForms').on("click", function (e) {
    if (!$('#filesSend').val()) {
      alert("Please select files before sending!");
      return;
    }
    $(this).prop('disabled', true);
    $('#processLoadingAdmin').removeClass('d-none');
    var formData = new FormData($('form#formSendFormsForPatient')[0]);
    formData.append('patientId', $(this).attr('data-patient-id'));
    $.ajax({
      method: "POST",
      url: "".concat(window.location.origin, "/doctor/send-forms-to-patient"),
      data: formData,
      cache: false,
      contentType: false,
      processData: false,
      success: function success(data) {
        $('#modalSendForms').modal('hide');
        $('#processLoadingAdmin').addClass('d-none');
        $('#btnSendFilesForms').prop('disabled', false);
        $(".fa-exclamation-circle[data-patient-id=".concat(data.patient.id, "]")).css('color', '#36b9cc');
        $(".fa-exclamation-circle[data-patient-id=".concat(data.patient.id, "]")).removeClass('fa-exclamation-circle').addClass('fa-check-circle');
        alertify.success('Sending remedies succeeds');
      },
      error: function (_error21) {
        function error(_x21) {
          return _error21.apply(this, arguments);
        }
        error.toString = function () {
          return _error21.toString();
        };
        return error;
      }(function (error) {
        alertify.error('An error occurs, please try again later!');
        console.log(error);
      })
    });
  });
}
function resetModal() {
  $("#modalDetailPatient").on('hidden.bs.modal', function (e) {
    $(this).find("input,textarea,select").val('').end().find("input[type=checkbox], input[type=radio]").prop("checked", "").end();
  });
  $("#modalHistoryBooking").on('hidden.bs.modal', function (e) {
    $(this).find("input,textarea,select").val('').end().find("input[type=checkbox], input[type=radio]").prop("checked", "").end();
  });
  $("#modalDetailPatientForDoctor").on('hidden.bs.modal', function (e) {
    $(this).find("input,textarea,select").val('').end().find("input[type=checkbox], input[type=radio]").prop("checked", "").end();
  });
  $("#modalSendForms").on('hidden.bs.modal', function (e) {
    $(this).find("input,textarea,select").val('').end().find("input[type=checkbox], input[type=radio]").prop("checked", "").end();
  });
  $("#modalCancelBooking").on('hidden.bs.modal', function (e) {
    $(this).find("input,textarea,select").val('').end().find("input[type=checkbox], input[type=radio]").prop("checked", "").end();
    $('#inputDefaultReason').prop('checked', true);
  });
}
function doneComment() {
  $(".done-comment").on('click', function (e) {
    if (confirm("Confirm save customer feedback?")) {
      var commentId = $(this).attr('data-comment-id');
      node = this;
      $.ajax({
        method: 'POST',
        url: "".concat(window.location.origin, "/supporter/done-comment"),
        data: {
          commentId: commentId
        },
        success: function success(data) {
          node.closest("tr").remove();
          console.log(data);
          alertify.success('Save customer feedback successfully');
        },
        error: function (_error22) {
          function error(_x22) {
            return _error22.apply(this, arguments);
          }
          error.toString = function () {
            return _error22.toString();
          };
          return error;
        }(function (error) {
          alertify.error('An error occurs, please try again later!');
          console.log(error);
        })
      });
    }
  });
}
function statisticalAdmin(month) {
  $.ajax({
    method: "POST",
    url: "".concat(window.location.origin, "/admin/statistical"),
    data: {
      month: month
    },
    success: function success(data) {
      $('#sumPatient').text(data.patients.count);
      $('#sumDoctor').text(data.doctors.count);
      $('#sumPost').text(data.posts.count);
      if (data.bestDoctor === '') {
        $('#bestDoctor').text("No information");
      } else {
        $('#bestDoctor').text("".concat(data.bestDoctor.name, " (").concat(data.bestDoctor.count, ")"));
      }
      if (data.bestSupporter === '') {
        $('#bestSupporter').text("No information");
      } else {
        $('#bestSupporter').text("".concat(data.bestSupporter.name, " (").concat(data.bestSupporter.count, ")"));
      }
    },
    error: function (_error23) {
      function error(_x23) {
        return _error23.apply(this, arguments);
      }
      error.toString = function () {
        return _error23.toString();
      };
      return error;
    }(function (error) {
      alertify.error('An error occurred while getting statistical information, please try again later');
      console.log(error);
    })
  });
}
function handleFindStatisticalAdmin() {
  $('#findStatisticalAdmin').on('click', function () {
    statisticalAdmin($('#monthAnalyse').val());
  });
}
$(document).ready(function (e) {
  // $('.modal').on('hidden.bs.modal', function(e) {
  //     $(this).removeData();
  // });

  var markdownIntroClinic = new SimpleMDE({
    element: document.getElementById("intro-clinic"),
    placeholder: 'Introductory content...',
    spellChecker: false
  });
  var markdownPost = new SimpleMDE({
    element: document.getElementById("contentMarkdown"),
    placeholder: 'Post content...',
    spellChecker: false
  });
  var converter = new showdown.Converter();
  //create datepicker, doctor create schedule
  $('#datepicker').datepicker({
    format: 'dd/mm/yyyy',
    weekStart: 1,
    daysOfWeekHighlighted: "6,0",
    autoclose: true,
    todayHighlight: true
  });
  $('#datepicker').datepicker("setDate", new Date());

  //create datepicker, doctor-appointment
  $('#dateDoctorAppointment').datepicker({
    format: 'dd/mm/yyyy',
    weekStart: 1,
    daysOfWeekHighlighted: "6,0",
    autoclose: true,
    todayHighlight: true
  });
  loadFile(e);
  loadImageUserSetting(e);
  createNewClinic(markdownIntroClinic, converter);
  deleteClinicById();
  updateClinic(markdownIntroClinic, converter);
  showModalInfoClinic();
  showModalSettingUser();
  createNewDoctor();
  deleteDoctorById();
  showModalInfoDoctor();
  updateDoctor();
  deleteSpecializationById();
  showPostsForSupporter();
  deletePostById();
  createNewPost(markdownPost, converter);
  updatePost(markdownPost, converter);
  var arr = handleBtnSchedule();
  createScheduleByDoctor(arr);
  var currentDate = $("#datepicker").val();
  handleChangeDatePicker(currentDate);
  loadNewPatientsForSupporter();
  handleBtnNewPatientOk();
  handleBtnNewPatientCancel();
  handleBtnPendingPatient();
  handleBtnPendingCancel();
  resetModal();
  handleAfterCallingPatient();
  handleViewInfoPatientBooked();
  handleCancelBtn();
  handleBtnViewHistory();
  handleDoctorViewInfoPatient();
  showModalSendForms();
  handleSendFormsForPatient();
  doneComment();
  var month = new Date().getMonth();
  statisticalAdmin(month + 1);
  handleFindStatisticalAdmin();
});