<!-- Contact Us Section -->
<section class="py-16 bg-blue-600 text-white">
    <div class="container mx-auto text-center">
      <h1 class="text-4xl font-bold">Contact Us</h1>
      <p class="mt-4">We would love to hear from you! Reach out to us through any of the methods below or fill out the contact form.</p>
    </div>
  </section>

  <section class="py-16">
    <div class="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
      <!-- Contact Info -->
      <div>
        <h2 class="text-2xl font-bold mb-6">Our Contact Details</h2>
        <p class="mb-4"><span class="font-bold">Address:</span> 123 CropWatch Lane, AgriCity, AG 45678</p>
        <p class="mb-4"><span class="font-bold">Phone:</span> +1 (123) 456-7890</p>
        <p class="mb-4"><span class="font-bold">Email:</span> contact@cropwatch.com</p>
        <p class="mb-4"><span class="font-bold">Business Hours:</span> Mon - Fri, 9 AM - 5 PM</p>
      </div>

      <!-- Contact Form -->
      <div>
        <h2 class="text-2xl font-bold mb-6">Send Us a Message</h2>
        <form class="space-y-4">
          <div>
            <label for="name" class="block text-gray-700 font-bold">Your Name</label>
            <input type="text" id="name" name="name" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
          </div>
          <div>
            <label for="email" class="block text-gray-700 font-bold">Your Email</label>
            <input type="email" id="email" name="email" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
          </div>
          <div>
            <label for="subject" class="block text-gray-700 font-bold">Subject</label>
            <input type="text" id="subject" name="subject" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600">
          </div>
          <div>
            <label for="message" class="block text-gray-700 font-bold">Message</label>
            <textarea id="message" name="message" rows="5" class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"></textarea>
          </div>
          <button type="submit" class="w-full bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">Send Message</button>
        </form>
      </div>
    </div>
  </section>