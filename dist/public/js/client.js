//"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var PHONE_REG = /((0[2|3|4|5|6|7|8|9]|01[2|6|8|9])+([0-9]{8})|(84[2|3|4|5|6|7|8|9]|841[2|6|8|9])+([0-9]{8}))\b/g;
var EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;
function getScheduleDoctorByDate() {
  $('#day-book').on('change', function (event) {
    var value = $(this).val();
    var arrSplit = value.split("-");
    var date = arrSplit[1].trim();
    var doctorId = $(this).data('doctor');
    $.ajax({
      method: "POST",
      url: "".concat(window.location.origin, "/doctor/get-schedule-doctor-by-date"),
      data: {
        date: date,
        doctorId: doctorId
      },
      success: function success(data) {
        //empty content inside div parent
        $('#div-schedule-id').html('');
        $('#div-more-info').html('');
        var html = '';
        var moreInfo = '';
        if (data.message.length > 0) {
          data.message.forEach(function (schedule, index) {
            if (schedule.isDisable === false) {
              html += "\n                          <div id=\"btn-modal-".concat(schedule.id, "\" data-doctorId=\"").concat(schedule.doctorId, "\" data-date=\"").concat(schedule.date, "\"\n                                 data-time=\"").concat(schedule.time, "\"\n                                 class=\"text-decoration-none\" onclick=\"openModalBooking(this.id)\">\n                                <div class=\"doctor-time\">\n                                    ").concat(schedule.time, "\n                                </div>\n                            </div>\n                        ");
            }
            if (index === data.message.length - 1 && schedule.isDisable === true) {
              html += "<div>\n                                  There are no scheduled visits in the current timeframe. Please select the next scheduled exams.\n                            </div>";
            }
            moreInfo = "\n                         <div class=\"d-flex flex-column\">\n                                    <div>\n                                                <span class=\"d-block mt-2\">Choose <i class=\"fa fa-hand-o-up\" aria-hidden=\"true\"></i>  and book a free consultation</span>\n                                    </div>\n                                    <div style=\"border-top: 1px solid #ccc\"\n                                         class=\"d-flex flex-column\">\n                                                            <span class=\"d-block pt-3 pb-1\"\n                                                                  style=\"text-transform: uppercase\">Address:</span>\n                                        <span class=\"d-block pb-1\"\n                                              style=\"border-bottom: 1px solid #ccc\">".concat(data.doctor.address, "</span>\n                                    </div>\n                                    <span class=\"d-block pt-2\">Price: 50 USD</span>\n                                </div>\n                        \n                        ");
          });
        } else {
          html = "\n                            <div>\n                                 Doctor \"".concat(data.doctor.name, "\" does not have an appointment on <b>").concat(value, "</b>. Please select the next examination schedule.\n                            </div>\n                    ");
          moreInfo = '';
        }
        $('#div-schedule-id').append(html);
        if (moreInfo !== '') {
          $('#div-more-info').append(moreInfo);
        }
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
        console.log(error);
      })
    });
  });
}
function specializationGetScheduleDoctorByDate() {
  $('.doctor-schedule-spe').unbind('change').bind('change', function (event) {
    var value = $(this).val();
    var arrSplit = value.split("-");
    var date = arrSplit[1].trim();
    var doctorId = $(this).data('doctor');
    $.ajax({
      method: "POST",
      url: "".concat(window.location.origin, "/doctor/get-schedule-doctor-by-date"),
      data: {
        date: date,
        doctorId: doctorId
      },
      success: function success(data) {
        //empty content inside div parent
        $("#div-schedule-".concat(doctorId)).html('');
        $("#div-more-info-".concat(doctorId)).html('');
        var html = '';
        var moreInfo = '';
        if (data.message.length > 0) {
          data.message.forEach(function (schedule, index) {
            if (schedule.isDisable === false) {
              html += "\n                          <div id=\"spe-btn-modal-".concat(schedule.id, "\" data-doctor-id=\"").concat(schedule.doctorId, "\" data-date=\"").concat(schedule.date, "\"\n                                 data-time=\"").concat(schedule.time, "\"\n                                 class=\"text-decoration-none show-modal-at-clinic-page\">\n                                <div class=\"doctor-time\">\n                                    ").concat(schedule.time, "\n                                </div>\n                            </div>\n                        ");
            }
            if (index === data.message.length - 1 && schedule.isDisable === true) {
              html += "<div>\n                                   There are no scheduled visits in the current timeframe. Please select the next scheduled exams.\n                            </div>";
            }
          });
          moreInfo = "\n                        <div class=\"d-flex flex-column\">\n                                            <div>\n                                                <span class=\"d-block mt-2\"> Choose <i class=\"fa fa-hand-o-up\" aria-hidden=\"true\"></i>  and book a free consultation</span>\n                                            </div>\n                                            <div style=\"border-top: 1px solid #ccc\" class=\"d-flex flex-column\">\n                                                <span class=\"d-block pt-3 pb-1\" style=\"text-transform: uppercase\">Address:</span>\n                                                <span class=\"d-block pb-1\" style=\"border-bottom: 1px solid #ccc\">".concat(data.doctor.address, "</span>\n                                            </div>\n                                            <span class=\"d-block pt-2\">Price: 50 USD</span>\n                         </div>\n                    ");
        } else {
          html = "\n                            <div class=\"no-schedule\">\n                               \n                                 Doctor \"".concat(data.doctor.name, "\" does not have an appointment on <b>").concat(value, "</b>. Please select the next examination schedule.\n\n                            </div>\n                    ");
          moreInfo = '';
        }
        $("#div-schedule-".concat(doctorId)).append(html);
        if (moreInfo !== '') {
          $("#div-more-info-".concat(doctorId)).append(moreInfo);
        }
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
        alertify.error('An error occurs, please try again later!!');
        console.log(error);
      })
    });
  });
}
function showModalAllSpecializations() {
  $('.show-all-specializations').on('click', function (e) {
    e.preventDefault();
    $('#modalAllSpecializations').modal('show');
  });
}
function showModalAllClinics() {
  $('.show-all-clinics').on('click', function (e) {
    e.preventDefault();
    $('#modalAllClinics').modal('show');
  });
}
function showModalAllDoctors() {
  $('.show-all-doctors').on('click', function (e) {
    e.preventDefault();
    $('#modalAllDoctors').modal('show');
  });
}
function showPostsForUsers() {
  var currentPage = 1;
  var total = $('#paginationForPostClient').data('total');
  if (total === 1) {
    $(' .li-next-client').addClass('disabled');
  }
  $('.page-post-next-client').on('click', function (e) {
    e.preventDefault();
    currentPage++;
    $(' .li-pre-client').removeClass('disabled');
    if (currentPage === total) {
      $(' .li-next-client').addClass('disabled');
    }
    if (currentPage > total) return;
    generatePostPagination(currentPage);
  });
  $('.page-post-pre-client').on('click', function (e) {
    e.preventDefault();
    currentPage--;
    $(' .li-next-client').removeClass('disabled');
    if (currentPage === 1) {
      $(' .li-pre-client').addClass('disabled');
    }
    if (currentPage === 0) return;
    generatePostPagination(currentPage);
  });
}
function generatePostPagination(page) {
  $.ajax({
    url: "".concat(window.location.origin, "/supporter/pagination/posts?page=").concat(page),
    method: 'GET',
    success: function success(data) {
      $("#list-posts-client").empty();
      var html = '';
      data.posts.rows.forEach(function (post) {
        html += "\n                            <a class=\"text-decoration-none\" href=\"/detail/post/".concat(post.id, "\">\n                                <div class=\" mb-5 d-flex flex-row\">\n                                    <div class=\"img-post col-4\">\n                                        <img src=\"https://cdn.bookingcare.vn/fr/w500/2018/06/18/113541benh-vien-bao-son.jpg\">\n                                    </div>\n                                    <div class=\"col-8 d-flex flex-column\">\n                                        <h3 class=\"show-title-post\">").concat(post.title, "</h3>\n                                        <div class=\"show-content-post\" style=\"color: black\">\n                                            ").concat(post.contentHTML.replace(/<\/?[^>]+(>|$)/g, ""), "\n                                        </div>\n                                    </div>\n                                </div>\n                            </a>\n                ");
      });
      $("#list-posts-client").append(html);
    },
    error: function error(err) {
      alertify.error('An error occurs, please try again later!');
      console.log(err);
    }
  });
}
function searchElasticClient() {
  $('#searchPostClient').on('keydown', function (event) {
    if (event.which === 13 || event.keyCode === 13) {
      var key_words = $('#searchPostClient').val();
      window.location.href = "".concat(window.location.origin, "/posts/search?keyword=").concat(key_words);
    }
  });
}
function searchInSearchPost() {
  $('#searchPostInSearchPageClient').on('keydown', function (event) {
    if (event.which === 13 || event.keyCode === 13) {
      var key_words = $('#searchPostInSearchPageClient').val();
      window.location.href = "".concat(window.location.origin, "/posts/search?keyword=").concat(key_words);
    }
  });
}
function searchInDetailPost() {
  $('#searchInDetailPost').on('keydown', function (event) {
    if (event.which === 13 || event.keyCode === 13) {
      var key_words = $('#searchInDetailPost').val();
      window.location.href = "".concat(window.location.origin, "/posts/search?keyword=").concat(key_words);
    }
  });
}
function showExtraInfoBooking() {
  $('#viewExtraInfo').on('click', function (e) {
    if ($("#divExtraInfo").hasClass("d-none")) {
      $("#divExtraInfo").removeClass("d-none").addClass("d-block");
    } else {
      $("#divExtraInfo").removeClass("d-block").addClass("d-none");
    }
  });
}
function validateInputPageDoctor() {
  if (!$("#name").val()) {
    $("#name").addClass('is-invalid');
    return false;
  } else {
    $("#name").removeClass('is-invalid');
  }
  if (!$("#phone").val()) {
    $("#phone").addClass('is-invalid');
    return false;
  }
  if ($("#phone").val()) {
    var isValid = $("#phone").val().match(PHONE_REG);
    if (isValid) {
      $("#phone").removeClass('is-invalid');
    } else {
      $("#phone").addClass('is-invalid');
      return false;
    }
  }
  if (!$("#email").val()) {
    $("#email").addClass('is-invalid');
    return false;
  }
  if ($("#email").val()) {
    var _isValid = $("#email").val().match(EMAIL_REG);
    if (_isValid) {
      $("#email").removeClass('is-invalid');
    } else {
      $("#email").addClass('is-invalid');
      return false;
    }
  }
  return true;
}
function handleBookingPageDoctorNormal(formData) {
  $.ajax({
    method: "POST",
    url: "".concat(window.location.origin, "/booking-doctor-normal/create"),
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    success: function success(data) {
      if (typeof data.patient === 'string') {
        alert("Unfortunately, this appointment has enough patients booked, please choose a different time.");
        window.location.reload(true);
      } else {
        window.location.href = "".concat(window.location.origin, "/booking-info/").concat(data.patient.id);
      }
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
function handleBookingPageDoctorWithoutFiles(data) {
  $.ajax({
    method: "POST",
    url: "".concat(window.location.origin, "/booking-doctor-without-files/create"),
    data: data,
    success: function success(data) {
      if (typeof data.patient === 'string') {
        alert("Unfortunately, this appointment has enough patients booked, please choose a different time.");
        window.location.reload(true);
      } else {
        window.location.href = "".concat(window.location.origin, "/booking-info/").concat(data.patient.id);
      }
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
function handleBookingPageDoctor() {
  $("#btn-confirm-booking").on("click", function (event) {
    var check = validateInputPageDoctor();
    if (check) {
      $(this).prop('disabled', true);
      $('#processLoading').removeClass('d-none');
      var formData = new FormData($('form#form-patient-info')[0]);
      //contain file upload
      var doctorId = $('#infoDoctor').data('doctor-id');
      var time = $('#time-patient-booking').text();
      var date = $('#date-patient-booking').text();
      if ($('#oldForms').val()) {
        formData.append("doctorId", doctorId);
        formData.append('timeBooking', time);
        formData.append('dateBooking', date);
        handleBookingPageDoctorNormal(formData);
      } else {
        var data = {
          doctorId: doctorId,
          timeBooking: time,
          dateBooking: date
        };
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
        delete data.oldForms;
        handleBookingPageDoctorWithoutFiles(data);
      }
    }
  });
}
function showModalBookingClinicPage() {
  $("#clinicRightContent").on('click', '.show-modal-at-clinic-page', function () {
    var id = $(this).attr('id');
    var doctorId = $("#".concat(id)).data('doctor-id');
    var date = $("#".concat(id)).data('date');
    var time = $("#".concat(id)).data('time');
    var formData = new FormData();
    formData.append('id', doctorId);
    var data = {};
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
    $.ajax({
      method: "POST",
      url: "".concat(window.location.origin, "/api/get-info-doctor-by-id"),
      data: data,
      success: function success(data) {
        $('#infoDoctorSpe').attr('data-doctor-id', doctorId);
        $('#modal-avatar-doctor-spe').attr('src', "/images/users/".concat(data.doctor.avatar));
        $('#doctor-name-spe').text("".concat(data.doctor.name));
        $('#time-patient-booking').text("".concat(time));
        $('#date-patient-booking').text("".concat(date));
        $('#doctor-address-spe').text("".concat(data.doctor.address));
        $('#modalBookingClinicDoctor').modal('show');
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
        alertify.error('An error occurs, please try again later!!');
        console.log(error);
      })
    });
  });
}
function handleBookingPageClinic() {
  $('#btn-confirm-booking-spe').on('click', function (e) {
    var check = validateInputPageDoctor();
    if (check) {
      $(this).prop('disabled', true);
      $('#processLoading').removeClass('d-none');
      var time = $('#time-patient-booking').text();
      var date = $('#date-patient-booking').text();
      var formData = new FormData($('form#form-patient-info-spe')[0]);
      //contain file upload
      var doctorId = $('#infoDoctorSpe').attr('data-doctor-id');
      if ($('#oldForms').val()) {
        formData.append("doctorId", doctorId);
        formData.append('timeBooking', time);
        formData.append('dateBooking', date);
        handleBookingPageDoctorNormal(formData);
      } else {
        var data = {
          doctorId: doctorId,
          timeBooking: time,
          dateBooking: date
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
        delete data.oldForms;
        handleBookingPageDoctorWithoutFiles(data);
      }
    }
  });
}
function showModalBookingSpecializationPage() {
  $("#specializationDoctor").on('click', '.show-modal-at-clinic-page', function () {
    var id = $(this).attr('id');
    var doctorId = $("#".concat(id)).data('doctor-id');
    var date = $("#".concat(id)).data('date');
    var time = $("#".concat(id)).data('time');
    var formData = new FormData();
    formData.append('id', doctorId);
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
      url: "".concat(window.location.origin, "/api/get-info-doctor-by-id"),
      data: data,
      success: function success(data) {
        $('#infoDoctorSpe').attr('data-doctor-id', doctorId);
        $('#modal-avatar-doctor-spe').attr('src', "/images/users/".concat(data.doctor.avatar));
        $('#doctor-name-spe').text("".concat(data.doctor.name));
        $('#time-patient-booking').text("".concat(time));
        $('#date-patient-booking').text("".concat(date));
        $('#doctor-address-spe').text("".concat(data.doctor.address));
        $('#modalBookingSpe').modal('show');
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
        alertify.error('An error occurs, please try again later!!');
        console.log(error);
      })
    });
  });
}
function validateFeedback() {
  if (!$("#feedbackName").val()) {
    $("#feedbackName").addClass('is-invalid');
    return false;
  } else {
    $("#feedbackName").removeClass('is-invalid');
  }
  if (!$("#feedbackPhone").val()) {
    $("#feedbackPhone").addClass('is-invalid');
    return false;
  } else {
    $("#feedbackPhone").removeClass('is-invalid');
  }
  if (!$("#feedbackContent").val()) {
    $("#feedbackContent").addClass('is-invalid');
    return false;
  } else {
    $("#feedbackContent").removeClass('is-invalid');
  }
  return true;
}
function handleSubmitFeedback() {
  $('#sendFeedback').on('click', function (e) {
    var doctorId = $(this).attr('data-doctor-id');
    var formData = new FormData($('form#formFeedBack')[0]);
    var data = {
      doctorId: doctorId
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
    $.ajax({
      method: 'POST',
      url: "".concat(window.location.origin, "/feedback/create"),
      data: {
        data: data
      },
      success: function success(data) {
        alert("Sending a Feedback succeeds!");
      },
      error: function (_error7) {
        function error(_x7) {
          return _error7.apply(this, arguments);
        }
        error.toString = function () {
          return _error7.toString();
        };
        return error;
      }(function (err) {
        alertify.error('An error occurs, please try again later!');
        console.log(error);
      })
    });
  });
}
$('html').click(function (e) {
  if (e.target.id === 'input-search') {
    //pass
  } else {
    //click outside inputSearch
    $('#show-info-search').css('display', 'none');
  }
});
function handleSearchHomepage() {
  $('#input-search').on('keyup', function (e) {
    if (e.keyCode === 13) {
      var keyword = $('#input-search').val();
      $.ajax({
        url: "".concat(window.location.origin, "/search-homepage"),
        method: 'POST',
        data: {
          keyword: keyword
        },
        success: function success(data) {
          var html = '';
          $('#show-info-search').empty();
          if (data.clinics.length === 0 && data.specializations.length === 0 && data.doctors.length === 0) {
            html += "\n                         <div class=\"child-info\">\n                               No search results found\n                        </div>\n                        ";
          }
          data.doctors.forEach(function (doctor) {
            html += "\n                         <div class=\"child-info\">\n                                <a href=\"detail/doctor/".concat(doctor.id, "\">Doctor - ").concat(doctor.name, "</a>\n                        </div>\n                        ");
          });
          data.clinics.forEach(function (clinic) {
            html += "\n                         <div class=\"child-info\">\n                                <a href=\"detail/clinic/".concat(clinic.id, "\">Clinic - ").concat(clinic.name, "</a>\n                        </div>\n                        ");
          });
          data.specializations.forEach(function (specialization) {
            html += "\n                         <div class=\"child-info\">\n                                <a href=\"detail/specialization/".concat(specialization.id, "\">Specialist - ").concat(specialization.name, "</a>\n                        </div>\n                        ");
          });
          $('#show-info-search').css('display', 'block');
          $('#show-info-search').append(html);
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
    }
  });
}
$(document).ready(function (e) {
  getScheduleDoctorByDate();
  specializationGetScheduleDoctorByDate();
  showModalAllSpecializations();
  showModalAllClinics();
  showModalAllDoctors();
  showPostsForUsers();
  searchElasticClient();
  searchInSearchPost();
  searchInDetailPost();
  showExtraInfoBooking();
  handleBookingPageDoctor();
  showModalBookingClinicPage();
  showModalBookingSpecializationPage();
  handleBookingPageClinic();
  handleSubmitFeedback();
  handleSearchHomepage();
});