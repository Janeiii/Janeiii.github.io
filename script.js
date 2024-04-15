<script>
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            });
        });

        // Add click event listeners to bubbles
        document.querySelectorAll('.bubble').forEach(bubble => {
        bubble.addEventListener('click', () => {
            // Redirect to project page when bubble is clicked
            window.location.href = bubble.querySelector('a').getAttribute('href');
        });
        });

</script>