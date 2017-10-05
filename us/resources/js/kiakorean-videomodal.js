$(document).ready(function () {
    $('.video-modal').on('click', function (e) {        
        //var src = $('#id-confidence section').attr('video-url');
        //var videoId = $('#id-confidence section').attr('video-id');
        //var vehicleDescription = $('#id-confidence section').attr('video-description');
        //var vehicleSeeAll = $('#id-confidence section').attr('video-see-all');
        //alert($("section.ten-video").attr('video-url'));

        //var src = $("section.ten-video").attr('video-url');
        //var videoId = $("section.ten-video").attr('video-id');

        var srcDepth;

        if ($(this).hasClass("kia-button")) {
            srcDepth = $(this).parent().parent().parent().parent();
        } else {
            srcDepth = $(this).parent().parent();
        }

        var src = srcDepth.find(".ten-video").attr('video-url');
        var videoId = srcDepth.find(".ten-video").attr('video-id');

        var vehicleDescription = srcDepth.find("section.ten-video").attr('video-description');
        var vehicleSeeAll = srcDepth.find("section.ten-video").attr('video-see-all');

        //alert($(this).parent().parent().find(".ten-video").attr('video-id'));

        $('.modal-footer').empty();
        $('.modal-footer')
             .append('<span>' + vehicleDescription + '</span>')
             .append('<a href="' + vehicleSeeAll + '" target="_self" class="gallery-link">SEE ALL</a>');

        $('#videoModal iframe').attr('src', src + videoId + '?wmode=transparent&enablejsapi=1&iv_load_policy=3&modestbranding=1&rel=0&showinfo=0');
    });

    $('#videoModal a.close-button').on('click', function () {
        $('#videoModal iframe').attr('src', '');    // stops video
        $('#videoModal').modal('hide');
    })

    // added following lines for stopping video when outside of modal is clicked
    jQuery('#videoModal').on('hidden.bs.modal', function (e) {
        $('#videoModal iframe').attr('src', '');    // stops video
    });
});
