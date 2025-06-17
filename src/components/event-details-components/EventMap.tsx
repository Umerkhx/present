
export default function EventMap() {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1845.921052062112!2d114.19122837656884!3d22.283970241862264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3404005554dd3513%3A0x79b611ab7fd021ac!2sSister%20Wah%20Beef%20Brisket!5e0!3m2!1sen!2s!4v1749140028081!5m2!1sen!2s"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg"
        />
      </div>
    </div>
  );
}