<?php

namespace NotepadBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * Note
 *
 * @ORM\Table(name="note")
 * @ORM\Entity(repositoryClass="NotepadBundle\Repository\NoteRepository")
 */
class Note
{
    /**
     * @var int
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="title", type="string", length=255)
     */
    private $title;

    /**
     * @var string
     *
     * @ORM\Column(name="content", type="string", length=8192)
     */
    private $content;

    /**
     * @var \DateTime
     *
     * @ORM\Column(name="date", type="datetime")
     */
    private $date;

    /**
     * @ORM\ManyToOne(targetEntity="Category")
     * @ORM\JoinColumn(name="category_id", referencedColumnName="id")
     */
    private $category;

    public function __construct() {
        $this->date = new \DateTime();
    }


    /**
     * Get id
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set title
     *
     * @param string $title
     *
     * @return Note
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @Assert\IsTrue(message="The content is not valid!")
     */
    public function isValidContent() {
        // http://stackoverflow.com/a/31387538
        $xml = new \DOMDocument();
        $implementation = new \DOMImplementation();
        $xml->appendChild($implementation->createDocumentType('content'));
        $content_elem = $xml->createElement('content');

        $content_xml = $xml->createDocumentFragment();
        $content_xml->appendXML($this->content);
        $content_elem->appendChild($content_xml);
        $xml->appendChild($content_elem);

        try {
            return $xml->schemaValidate('tag.xsd');
        } catch (\ErrorException $e) {
            return false;
        }
        return true;
    }

    /**
     * Set content
     *
     * @param string $content
     *
     * @return Note
     */
    public function setContent($content)
    {
        $this->content = $content;

        return $this;
    }

    /**
     * Get content
     *
     * @return string
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Set date
     *
     * @param \DateTime $date
     *
     * @return Note
     */
    public function setDate($date)
    {
        $this->date = $date;

        return $this;
    }

    /**
     * Get date
     *
     * @return \DateTime
     */
    public function getDate()
    {
        return $this->date;
    }

    /**
     * Set category
     *
     * @param \NotepadBundle\Entity\Category $category
     *
     * @return Note
     */
    public function setCategory(\NotepadBundle\Entity\Category $category = null)
    {
        $this->category = $category;

        return $this;
    }

    /**
     * Get category
     *
     * @return \NotepadBundle\Entity\Category
     */
    public function getCategory()
    {
        return $this->category;
    }
}
